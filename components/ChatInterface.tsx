import React, { useState, useEffect, useRef } from 'react';
import { User, Place, ChatMessage } from '../types';
import { generateIcebreaker, chatWithBot } from '../services/geminiService';
import { Send, Sparkles, ChevronLeft, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInterfaceProps {
  partner: User;
  place: Place;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ partner, place, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<string>('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial system message
    setMessages([
      {
        id: '1',
        senderId: 'system',
        text: `You matched with ${partner.name} at ${place.name}!`,
        timestamp: new Date()
      }
    ]);

    // Generate icebreaker
    const fetchSuggestion = async () => {
        setIsGenerating(true);
        const text = await generateIcebreaker(place, partner);
        setSuggestion(text);
        setIsGenerating(false);
    };
    fetchSuggestion();
  }, [partner, place]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string = inputText) => {
    if (!text.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setSuggestion(''); // Clear suggestion after sending

    // Simulate Partner "typing" then replying using Gemini
    setTimeout(async () => {
        // Prepare chat history for context
        const history = messages.map(m => ({
            role: m.senderId === 'me' ? 'user' : 'model',
            text: m.text
        }));
        
        // Simulating partner via Gemini (using a persona prompt)
        const partnerReply = await chatWithBot(history, text + " (Reply as if you are a user named Helen interested in going to this place)");
        
        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            senderId: 'partner',
            text: partnerReply,
            timestamp: new Date()
        }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-dark-900 relative z-40">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-dark-800/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 text-white/70 hover:text-white">
            <ChevronLeft />
          </button>
          <div className="relative">
            <img src={partner.photoUrl} className="w-10 h-10 rounded-full border border-white/20" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-900"></div>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">{partner.name}</h3>
            <p className="text-xs text-gold-500 flex items-center gap-1">
                Matched at {place.name}
            </p>
          </div>
        </div>
        <button className="text-white/50">
            <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          if (msg.senderId === 'system') {
             return (
                 <div key={msg.id} className="flex justify-center my-4">
                     <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">{msg.text}</span>
                 </div>
             )
          }
          const isMe = msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                  isMe 
                    ? 'bg-gold-500 text-black rounded-tr-sm' 
                    : 'bg-dark-700 text-white rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion Pill */}
      {suggestion && (
          <div className="px-4 pb-2">
            <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSend(suggestion)}
                className="w-full text-left bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10 p-3 rounded-xl flex items-start gap-3 hover:bg-white/5 transition-colors group"
            >
                <div className="mt-1 bg-gradient-to-tr from-purple-400 to-blue-400 rounded-full p-1">
                     <Sparkles size={12} className="text-white" />
                </div>
                <div>
                    <span className="text-xs text-purple-300 font-semibold mb-1 block">Gemini Suggestion</span>
                    <p className="text-sm text-white/90 italic">"{suggestion}"</p>
                </div>
            </motion.button>
          </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-dark-800">
        <div className="flex items-center gap-2 bg-dark-900 border border-white/10 rounded-full px-4 py-2">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none text-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-2 bg-gold-500 rounded-full text-dark-900 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
