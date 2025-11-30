
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo, AnimatePresence } from 'framer-motion';
import { Place, User } from '../types';
import { Heart, X, Info, MapPin, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { calculateCompatibility } from '../services/matchingService';

interface SwipeDeckProps {
  places: Place[];
  onMatch: (place: Place) => void;
  currentUser: User;
  partner: User;
}

interface CardProps {
  place: Place;
  currentUser: User;
  partner: User;
  onSwipe: (dir: 'left' | 'right') => void;
  isFront: boolean;
  dragX: any; // Shared motion value for stack effect
}

const Card: React.FC<CardProps> = ({ place, currentUser, partner, onSwipe, isFront, dragX }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const controls = useAnimation();
  
  // Independent motion values for this specific card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Link the shared dragX to this card's x only if it is the front card
  useEffect(() => {
    if (isFront) {
        const unsubscribe = x.on("change", (latest) => dragX.set(latest));
        return unsubscribe;
    }
  }, [isFront, x, dragX]);

  // Rotation based on X movement for that "throwing" feel
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  
  // Opacity for "Like/Nope" stamps
  const likeOpacity = useTransform(x, [20, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -20], [1, 0]);
  
  // Match Calculation
  const { score, matchReasons } = React.useMemo(() => 
    calculateCompatibility(place, currentUser, partner), 
  [place, currentUser, partner]);

  const handleDragEnd = async (_: any, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;

    if (info.offset.x > threshold || velocity > 500) {
      // Swipe Right
      await controls.start({ x: 500, opacity: 0, transition: { duration: 0.4 } });
      onSwipe('right');
    } else if (info.offset.x < -threshold || velocity < -500) {
      // Swipe Left
      await controls.start({ x: -500, opacity: 0, transition: { duration: 0.4 } });
      onSwipe('left');
    } else {
      // Return to center
      controls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
      dragX.set(0); // Reset stack effect
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex < place.photos.length - 1) setPhotoIndex(prev => prev + 1);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex > 0) setPhotoIndex(prev => prev - 1);
  };

  return (
    <motion.div
      style={{ x, y, rotate, zIndex: isFront ? 50 : 10 }}
      drag={isFront ? true : false} // Only front card is draggable
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.6} // Bouncy, responsive feel
      animate={controls}
      onDragEnd={handleDragEnd}
      initial={{ scale: isFront ? 1 : 0.9, y: isFront ? 0 : 30, opacity: isFront ? 1 : 0 }} 
      className={`absolute w-full h-full max-w-sm rounded-[36px] overflow-hidden shadow-2xl bg-dark-800 border border-white/10 ${isFront ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
    >
      {/* --- IMAGE LAYER --- */}
      <div className="relative h-full w-full">
        <AnimatePresence mode='wait'>
            <motion.img 
                key={photoIndex}
                src={place.photos[photoIndex]} 
                alt={place.name} 
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            />
        </AnimatePresence>
        
        {/* Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />

        {/* --- TAP ZONES FOR PHOTOS (Invisible) --- */}
        {/* We use these overlay divs to handle taps, leaving the swipe gesture for the parent motion.div */}
        <div className="absolute inset-0 flex z-30">
            <div className="w-1/2 h-[70%]" onClick={prevPhoto} />
            <div className="w-1/2 h-[70%]" onClick={nextPhoto} />
        </div>

        {/* --- PHOTO INDICATORS --- */}
        <div className="absolute top-3 left-0 w-full flex justify-center gap-1.5 z-40 px-6">
             {place.photos.map((_, i) => (
                 <div key={i} className="h-1 flex-1 rounded-full bg-black/20 overflow-hidden backdrop-blur-sm">
                     <div 
                        className={`h-full bg-white shadow-sm transition-all duration-300 ${i === photoIndex ? 'w-full opacity-100' : 'w-full opacity-30'}`} 
                     />
                 </div>
             ))}
        </div>

        {/* --- STAMPS --- */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-8 z-40 transform -rotate-12 border-4 border-green-500 rounded-xl px-4 py-2 bg-black/20 backdrop-blur-sm">
          <span className="text-green-500 text-4xl font-black tracking-widest uppercase shadow-black drop-shadow-md">LIKE</span>
        </motion.div>
        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-8 z-40 transform rotate-12 border-4 border-red-500 rounded-xl px-4 py-2 bg-black/20 backdrop-blur-sm">
          <span className="text-red-500 text-4xl font-black tracking-widest uppercase shadow-black drop-shadow-md">NOPE</span>
        </motion.div>

        {/* --- MATCH BADGE --- */}
        <div className="absolute top-8 right-6 z-40 flex flex-col items-end gap-2">
           <div className={`backdrop-blur-xl border border-white/20 rounded-full pl-2 pr-3 py-1 flex items-center gap-1.5 shadow-xl ${score > 80 ? 'bg-gold-500 text-black' : 'bg-dark-900/60 text-white'}`}>
                <Sparkles size={14} className={score > 80 ? 'fill-black' : 'fill-gold-500 text-gold-500'} />
                <span className="text-xs font-bold">{score}% Match</span>
           </div>
           <div className="backdrop-blur-xl border border-white/20 rounded-full px-3 py-1 bg-dark-900/60 text-white shadow-lg">
                <span className={`text-xs font-bold ${place.priceLevel.length > 2 ? 'text-gold-500' : 'text-white'}`}>{place.priceLevel}</span>
           </div>
        </div>

        {/* --- INFO CONTENT --- */}
        <div className="absolute bottom-0 w-full p-6 pb-28 z-40 select-none pointer-events-none">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-gold-500 text-black text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide shadow-lg">
                {place.type}
            </span>
            <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide backdrop-blur-md border border-white/10">
                {place.vibe}
            </span>
          </div>
          
          <h2 className="text-4xl font-bold mb-1 text-white drop-shadow-lg">{place.name}</h2>
          
          <div className="flex items-center gap-4 mb-3 text-white/90 text-sm font-medium">
             <div className="flex items-center gap-1">
                 <MapPin size={14} className="text-gold-500 fill-gold-500" />
                 <span>0.8 mi</span>
             </div>
             <div className="flex items-center gap-1">
                 <span className="text-gold-500 text-base">★</span>
                 <span>{place.rating}</span>
             </div>
          </div>

          <p className="text-white/80 text-sm line-clamp-2 leading-relaxed mb-3 drop-shadow-md">
            {place.description}
          </p>
          
          {/* Reasons */}
          {matchReasons.length > 0 && (
             <div className="flex gap-2 flex-wrap">
                 {matchReasons.slice(0, 2).map((reason, i) => (
                     <span key={i} className="text-[10px] bg-gradient-to-r from-purple-500/80 to-blue-500/80 border border-white/20 rounded-full px-2 py-0.5 text-white shadow-sm backdrop-blur-md">
                        ✨ {reason}
                     </span>
                 ))}
             </div>
          )}
        </div>

        {/* Info Button */}
        <button className="absolute bottom-28 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-colors z-50 pointer-events-auto">
            <Info size={20} className="text-white" />
        </button>

        {/* Tap Hints (Visual only) */}
        <div className="absolute top-1/2 left-2 -translate-y-1/2 p-2 opacity-0 active:opacity-40 transition-opacity pointer-events-none">
             <ChevronLeft size={32} className="text-white drop-shadow-md" />
        </div>
        <div className="absolute top-1/2 right-2 -translate-y-1/2 p-2 opacity-0 active:opacity-40 transition-opacity pointer-events-none">
             <ChevronRight size={32} className="text-white drop-shadow-md" />
        </div>
      </div>
    </motion.div>
  );
};

const SwipeDeck: React.FC<SwipeDeckProps> = ({ places, onMatch, currentUser, partner }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragX = useMotionValue(0); // Shared drag value for stack effect

  const handleSwipe = (dir: 'left' | 'right') => {
    if (dir === 'right') {
      const place = places[currentIndex];
      const { score } = calculateCompatibility(place, currentUser, partner);
      if (score > 70) {
         setTimeout(() => onMatch(place), 250);
      }
    }
    // Delay setting index to allow exit animation to play
    setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        dragX.set(0); // Reset stack effect
    }, 200);
  };

  if (currentIndex >= places.length) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-dark-900">
            <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mb-6 border border-white/10 animate-pulse">
                <MapPin size={40} className="text-gold-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No more places</h3>
            <p className="text-white/50 max-w-xs">We've run out of recommendations in this area. Try expanding your filters.</p>
        </div>
    )
  }

  // Slice 3 cards to create a visible stack (Front, Next, Next-Next)
  const activePlaces = places.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 pt-6 pb-20 overflow-hidden">
      <div className="relative w-full h-full max-w-sm">
        {activePlaces.map((place, i) => {
             const isFront = i === 0;
             return (
                 <React.Fragment key={place.id}>
                    {/* Render cards in reverse order so 0 is on top */}
                    <StackCardWrapper dragX={dragX} index={i}>
                        <Card 
                            place={place} 
                            currentUser={currentUser}
                            partner={partner}
                            onSwipe={handleSwipe} 
                            isFront={isFront}
                            dragX={dragX}
                        />
                    </StackCardWrapper>
                 </React.Fragment>
             )
        }).reverse()} 
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-6 flex items-center gap-8 z-50">
        <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 bg-dark-800/80 backdrop-blur-xl rounded-full flex items-center justify-center border border-red-500/20 text-red-500 shadow-2xl hover:bg-dark-700 transition-colors"
        >
            <X size={32} strokeWidth={3} />
        </motion.button>
        
        <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('right')}
            className="w-20 h-20 bg-gradient-to-tr from-gold-600 to-gold-400 rounded-full flex items-center justify-center text-white shadow-xl shadow-gold-500/30 border-4 border-dark-900"
        >
            <Heart size={36} strokeWidth={3} fill="currentColor" />
        </motion.button>
      </div>
    </div>
  );
};

// Enhanced wrapper that handles 3D stack positioning for multiple cards
const StackCardWrapper: React.FC<{ children: React.ReactNode, dragX: any, index: number }> = ({ children, dragX, index }) => {
    // If it's the front card (index 0), we don't apply stack transformations, 
    // we just let the Card's own drag handlers do the work.
    if (index === 0) {
        return <div className="absolute inset-0 z-50">{children}</div>;
    }

    // Config for card at position N
    const cardOffset = 15; // Pixels down
    const cardScale = 0.05; // Scale difference

    const baseScale = 1 - (index * cardScale);
    const targetScale = 1 - ((index - 1) * cardScale); // Scale it will become
    
    const baseY = index * cardOffset;
    const targetY = (index - 1) * cardOffset; // Y it will become

    const baseOpacity = 1 - (index * 0.2);
    const targetOpacity = 1 - ((index - 1) * 0.2);

    // Transform based on DragX of front card
    // When front card is dragged 200px (left or right), this card moves to "Target" properties
    const scale = useTransform(dragX, [-200, 0, 200], [targetScale, baseScale, targetScale]);
    const y = useTransform(dragX, [-200, 0, 200], [targetY, baseY, targetY]);
    const opacity = useTransform(dragX, [-200, 0, 200], [targetOpacity, baseOpacity, targetOpacity]);

    return (
        <motion.div style={{ scale, y, opacity }} className="absolute inset-0 z-0 origin-bottom">
            {children}
        </motion.div>
    )
}

export default SwipeDeck;
