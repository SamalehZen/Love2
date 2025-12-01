import React, { useState, useEffect, useRef } from 'react';
import { User, Place, ChatMessage } from '../types';
import { generateIcebreaker, chatWithBot } from '../services/geminiService';
import { Send, Sparkles, ChevronLeft, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkeletonMessage } from './SkeletonCard';
import { Toast } from './Toast';

interface ChatInterfaceProps {
  partner: User;
  place: Place;
  onBack: () => void;
}

type ToastState = { message: string; type: 'error' | 'success' | 'info' } | null;

const ChatInterface: React.FC<ChatInterfaceProps> = ({ partner, place, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const systemMessage: ChatMessage = {
      id: '1',
      senderId: 'system',
      text: `You matched with ${partner.name} at ${place.name}!`,
      timestamp: new Date(),
    };

    setMessages([systemMessage]);
    messagesRef.current = [systemMessage];
    setSuggestion('');
    setIsPartnerTyping(false);

    let isMounted = true;

    const fetchSuggestion = async () => {
      setIsGenerating(true);
      try {
        const result = await generateIcebreaker(place, partner);
        if (!isMounted) return;
        setSuggestion(result.text);
        if (result.error) {
          setToast({ message: 'Using a backup opener while Gemini reconnects.', type: 'info' });
        }
      } catch (error) {
        if (!isMounted) return;
        setToast({ message: 'Could not fetch an icebreaker. Try again soon.', type: 'error' });
      } finally {
        if (isMounted) {
          setIsGenerating(false);
        }
      }
    };

    fetchSuggestion();

    return () => {
      isMounted = false;
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
  }, [partner, place]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPartnerTyping]);

  const handleSend = (text: string = inputText) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: trimmed,
      timestamp: new Date(),
    };

    const updatedMessages = [...messagesRef.current, newMessage];
    messagesRef.current = updatedMessages;
    setMessages(updatedMessages);
    setInputText('');
    setSuggestion('');
    setIsPartnerTyping(true);

    const historySnapshot = updatedMessages.map((m) => ({
      role: m.senderId === 'me' ? 'user' : 'model',
      text: m.text,
    }));

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      try {
        const partnerReply = await chatWithBot(
          historySnapshot,
          `${trimmed} (Reply as if you are ${partner.name}, interested in going to this place. Be natural and flirty.)`
        );

        const replyMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          senderId: 'partner',
          text: partnerReply,
          timestamp: new Date(),
        };

        setMessages((prev) => {
          const next = [...prev, replyMessage];
          messagesRef.current = next;
          return next;
        });
      } catch (error) {
        setToast({ message: "Couldn't get a reply. Try again.", type: 'error' });
      } finally {
        setIsPartnerTyping(false);
        typingTimeoutRef.current = null;
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-dark-900 relative z-40">
      <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>

      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-dark-800/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 text-white/70 hover:text-white">
            <ChevronLeft />
          </button>
          <div className="relative">
            <img
              src={partner.photoUrl}
              alt={partner.name}
              className="w-10 h-10 rounded-full border border-white/20"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-900"></div>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">{partner.name}</h3>
            <p className="text-xs text-gold-500 flex items-center gap-1">Matched at {place.name}</p>
          </div>
        </div>
        <button className="text-white/50">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          if (msg.senderId === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-4">
                <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">{msg.text}</span>
              </div>
            );
          }
          const isMe = msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                  isMe ? 'bg-gold-500 text-black rounded-tr-sm' : 'bg-dark-700 text-white rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {isGenerating && (
          <div className="flex justify-start">
            <SkeletonMessage />
          </div>
        )}

        {isPartnerTyping && (
          <div className="flex justify-start">
            <div className="bg-dark-700 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
              <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

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
