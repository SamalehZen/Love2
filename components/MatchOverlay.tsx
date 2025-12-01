import React from 'react';
import { motion } from 'framer-motion';
import { Place, User } from '../types';
import { MessageCircle } from 'lucide-react';

interface MatchOverlayProps {
  partner: User;
  place: Place;
  onStartChat: () => void;
  onDismiss: () => void;
}

const MatchOverlay: React.FC<MatchOverlayProps> = ({ partner, place, onStartChat, onDismiss }) => {
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl p-6"
    >
      <div className="relative w-full max-w-sm">
        {/* Match Text */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-200 tracking-tighter drop-shadow-lg">
            IT'S A<br/>MATCH!
          </h1>
          <p className="text-white/60 mt-2 font-medium">You and {partner.name} both liked {place.name}</p>
        </motion.div>

        {/* Avatars */}
        <div className="relative h-48 w-full flex justify-center items-center mb-12">
            {/* Left Avatar (Place) */}
            <motion.div 
                initial={{ x: -100, rotate: -20, opacity: 0 }}
                animate={{ x: -30, rotate: -10, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.4 }}
                className="absolute w-32 h-32 rounded-3xl border-4 border-white overflow-hidden shadow-2xl z-10"
            >
                <img src={place.photoUrl} alt={place.name} className="w-full h-full object-cover" />
            </motion.div>

            {/* Right Avatar (Partner) */}
            <motion.div 
                initial={{ x: 100, rotate: 20, opacity: 0 }}
                animate={{ x: 30, rotate: 10, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.5 }}
                className="absolute w-32 h-32 rounded-full border-4 border-gold-500 overflow-hidden shadow-2xl z-20"
            >
                <img src={partner.photoUrl} alt={partner.name} className="w-full h-full object-cover" />
            </motion.div>

             {/* Connection Icon */}
             <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute z-30 bg-white text-gold-600 p-2 rounded-full shadow-lg"
             >
                <HeartIcon />
             </motion.div>
        </div>

        {/* Actions */}
        <div className="space-y-3 w-full">
            <motion.button 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={onStartChat}
                className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
            >
                <MessageCircle size={20} className="fill-current" />
                Plan the Date
            </motion.button>
            
            <motion.button 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                onClick={onDismiss}
                className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-lg flex items-center justify-center gap-2 backdrop-blur-md"
            >
                Keep Swiping
            </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const HeartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
    </svg>
)

export default MatchOverlay;
