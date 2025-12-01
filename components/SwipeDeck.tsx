import React, { useState, useEffect, useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  PanInfo,
  AnimatePresence,
  MotionValue,
} from 'framer-motion';
import {
  Heart,
  X,
  Info,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Menu,
  SlidersHorizontal,
  Flame,
  Bookmark,
  MoreVertical,
} from 'lucide-react';
import { Place, User } from '../types';
import { calculateCompatibility, MATCH_CONFIG } from '../services/matchingService';
import { SkeletonCard } from './SkeletonCard';

interface SwipeDeckProps {
  places: Place[];
  onMatch: (place: Place) => void;
  currentUser: User;
  partner: User;
}

type FilterId = 'forYou' | 'nearby';

interface CardProps {
  place: Place;
  distanceLabel: string;
  partner: User;
  currentUser: User;
  onSwipe: (dir: 'left' | 'right') => void;
  isFront: boolean;
  dragX: MotionValue<number>;
}

const filters: { id: FilterId; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'forYou', label: 'For You', icon: Flame },
  { id: 'nearby', label: 'Nearby', icon: MapPin },
];

const getDistanceKm = (user: User, place: Place) => {
  const distLat = place.lat - user.location.lat;
  const distLng = place.lng - user.location.lng;
  return Math.sqrt(distLat * distLat + distLng * distLng) * 111;
};

const formatDistance = (user: User, place: Place) => {
  const km = getDistanceKm(user, place);
  if (km < 1) {
    return `${Math.max(km * 1000, 100).toFixed(0)} m`;
  }
  return `${km.toFixed(1)} km`;
};

const CardComponent: React.FC<CardProps> = ({
  place,
  partner,
  currentUser,
  onSwipe,
  isFront,
  dragX,
  distanceLabel,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!isFront) return;
    const unsubscribe = x.on('change', (latest) => dragX.set(latest));
    return unsubscribe;
  }, [isFront, x, dragX]);

  useEffect(() => {
    setPhotoIndex(0);
  }, [place.id]);

  const rotate = useTransform(x, [-220, 220], [-18, 18]);
  const likeOpacity = useTransform(x, [20, 160], [0, 1]);
  const nopeOpacity = useTransform(x, [-160, -20], [1, 0]);
  const backgroundTint = useTransform(
    x,
    [-200, 0, 200],
    ['rgba(239,68,68,0.18)', 'rgba(0,0,0,0)', 'rgba(34,197,94,0.18)']
  );

  const safePhotos = useMemo(() => {
    if (place.photos && place.photos.length > 0) return place.photos;
    return [place.photoUrl];
  }, [place.photoUrl, place.photos]);

  const cappedIndex = Math.min(photoIndex, safePhotos.length - 1);
  const activePhoto = safePhotos[cappedIndex];

  const { score, matchReasons } = useMemo(
    () => calculateCompatibility(place, currentUser, partner),
    [place, currentUser, partner]
  );

  const handleDragEnd = async (_: any, info: PanInfo) => {
    const threshold = 120;
    const velocity = info.velocity.x;

    if (info.offset.x > threshold || velocity > 500) {
      await controls.start({ x: 500, opacity: 0, rotate: 12, transition: { duration: 0.35 } });
      onSwipe('right');
    } else if (info.offset.x < -threshold || velocity < -500) {
      await controls.start({ x: -500, opacity: 0, rotate: -12, transition: { duration: 0.35 } });
      onSwipe('left');
    } else {
      controls.start({ x: 0, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 320, damping: 28 } });
      dragX.set(0);
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (safePhotos.length <= 1) return;
    setPhotoIndex((prev) => Math.min(prev + 1, safePhotos.length - 1));
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (safePhotos.length <= 1) return;
    setPhotoIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <motion.div
      style={{ x, y, rotate, zIndex: isFront ? 50 : 10 }}
      drag={isFront}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.5}
      animate={controls}
      onDragEnd={handleDragEnd}
      initial={{ scale: isFront ? 1 : 0.94, y: isFront ? 0 : 24, opacity: isFront ? 1 : 0 }}
      className={`absolute inset-0 rounded-[38px] bg-dark-800 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.65)] border border-white/10 ${
        isFront ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      }`}
    >
      <motion.div style={{ backgroundColor: backgroundTint }} className="absolute inset-0 z-10 rounded-[38px] pointer-events-none" />

      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={activePhoto}
            src={activePhoto}
            alt={place.name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0.2, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            loading="lazy"
            draggable={false}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />

        {safePhotos.length > 1 && (
          <div className="absolute inset-0 flex z-30">
            <div className="w-1/2 h-[70%]" onClick={prevPhoto} />
            <div className="w-1/2 h-[70%]" onClick={nextPhoto} />
          </div>
        )}

        {safePhotos.length > 1 && (
          <div className="absolute top-4 left-0 w-full flex justify-center gap-1.5 z-40 px-6">
            {safePhotos.map((photo, idx) => (
              <div key={photo + idx} className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden">
                <div
                  className={`h-full bg-white transition-all duration-300 ${idx <= cappedIndex ? 'opacity-100 w-full' : 'opacity-30 w-full'}`}
                />
              </div>
            ))}
          </div>
        )}

        <div className="absolute top-4 left-4 z-40 flex gap-3">
          <button className="w-9 h-9 rounded-full bg-black/40 border border-white/15 text-white/80 hover:text-white backdrop-blur-md">
            <MoreVertical size={18} />
          </button>
        </div>
        <div className="absolute top-4 right-4 z-40 flex gap-3">
          <button className="w-9 h-9 rounded-full bg-black/40 border border-white/15 text-white/80 hover:text-white backdrop-blur-md">
            <Bookmark size={18} />
          </button>
        </div>

        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-12 left-10 z-40 -rotate-12 border-4 border-green-400 rounded-2xl px-5 py-2 bg-black/10 backdrop-blur"
        >
          <span className="text-green-400 text-3xl font-black tracking-widest">LIKE</span>
        </motion.div>
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute top-12 right-10 z-40 rotate-12 border-4 border-red-400 rounded-2xl px-5 py-2 bg-black/10 backdrop-blur"
        >
          <span className="text-red-400 text-3xl font-black tracking-widest">NOPE</span>
        </motion.div>

        <div className="absolute top-8 right-6 z-40 flex flex-col items-end gap-2">
          <div
            className={`backdrop-blur-xl border border-white/20 rounded-full pl-2 pr-3 py-1 flex items-center gap-1.5 shadow-xl ${
              score > 80 ? 'bg-gold-500 text-black' : 'bg-dark-900/70 text-white'
            }`}
          >
            <Sparkles size={14} className={score > 80 ? 'fill-black' : 'text-gold-400'} />
            <span className="text-xs font-bold">{score}% Match</span>
          </div>
          <div className="backdrop-blur-xl border border-white/20 rounded-full px-3 py-1 bg-dark-900/70 text-white shadow-lg">
            <span className="text-xs font-semibold">{place.priceLevel}</span>
          </div>
        </div>

        <div className="absolute bottom-0 w-full p-6 pb-28 z-40 select-none pointer-events-none">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-black/40 border border-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur">
              <span className={`w-2 h-2 rounded-full ${place.isOpen ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
              {place.isOpen ? 'In real time' : 'Closed now'}
            </span>
            <span className="bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 backdrop-blur">
              {place.type}
            </span>
            <span className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full border border-white/10 backdrop-blur">
              {place.vibe}
            </span>
          </div>

          <h2 className="text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]">{place.name}</h2>

          <div className="flex items-center gap-4 text-white/80 text-sm font-medium mb-3">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-gold-400" />
              <span>{distanceLabel}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gold-400">★</span>
              <span>{place.rating}</span>
            </div>
          </div>

          <p className="text-white/85 text-sm leading-relaxed mb-3 line-clamp-2 drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)]">{place.description}</p>

          {matchReasons.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {matchReasons.slice(0, 2).map((reason) => (
                <span
                  key={reason}
                  className="text-[11px] bg-gradient-to-r from-purple-500/80 to-blue-500/80 border border-white/20 rounded-full px-3 py-1 text-white shadow-sm backdrop-blur"
                >
                  ✨ {reason}
                </span>
              ))}
            </div>
          )}
        </div>

        <button className="absolute bottom-28 right-6 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/25 transition-colors z-50 pointer-events-auto">
          <Info size={20} className="text-white" />
        </button>

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

const Card = React.memo(
  CardComponent,
  (prev, next) => prev.place.id === next.place.id && prev.isFront === next.isFront
);

const SwipeDeck: React.FC<SwipeDeckProps> = ({ places, onMatch, currentUser, partner }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterId>('forYou');
  const dragX = useMotionValue(0);

  const orderedPlaces = useMemo(() => {
    if (activeFilter === 'nearby') {
      return [...places].sort(
        (a, b) => getDistanceKm(currentUser, a) - getDistanceKm(currentUser, b)
      );
    }
    return places;
  }, [places, activeFilter, currentUser]);

  useEffect(() => {
    dragX.set(0);
  }, [currentIndex, dragX]);

  useEffect(() => {
    setCurrentIndex(0);
    dragX.set(0);
  }, [activeFilter, dragX]);

  const handleSwipe = (dir: 'left' | 'right') => {
    const place = orderedPlaces[currentIndex];
    if (!place) return;

    if (dir === 'right') {
      const { score } = calculateCompatibility(place, currentUser, partner);
      if (score > MATCH_CONFIG.MATCH_THRESHOLD) {
        setTimeout(() => onMatch(place), 250);
      }
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      dragX.set(0);
    }, 200);
  };

  if (!orderedPlaces.length) {
    return (
      <div className="relative w-full h-full flex items-center justify-center px-4 pt-6 pb-20">
        <SkeletonCard />
      </div>
    );
  }

  if (currentIndex >= orderedPlaces.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-full text-center p-8 bg-dark-900"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-24 h-24 bg-gradient-to-br from-dark-800 to-dark-700 rounded-full flex items-center justify-center mb-6 border border-white/10"
        >
          <MapPin size={40} className="text-gold-500" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">No more places</h3>
        <p className="text-white/50 max-w-xs mb-6">We've run out of recommendations in this area.</p>
        <button className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-xl transition-colors">
          Expand Filters
        </button>
      </motion.div>
    );
  }

  const activePlaces = orderedPlaces.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 pt-20 pb-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full px-6 pt-6 pb-8 pointer-events-none z-30">
        <div className="flex items-center justify-between pointer-events-auto">
          <button className="w-11 h-11 rounded-full bg-dark-800/80 border border-white/10 text-white flex items-center justify-center shadow-lg">
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2 bg-dark-800/80 border border-white/10 rounded-full px-2 py-1 shadow-lg">
            {filters.map(({ id, label, icon: Icon }) => {
              const isActive = activeFilter === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-black shadow-lg'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              );
            })}
          </div>

          <button className="w-11 h-11 rounded-full bg-dark-800/80 border border-white/10 text-white flex items-center justify-center shadow-lg">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="relative w-full h-full max-w-sm md:max-w-md lg:max-w-lg mx-auto">
        {activePlaces
          .map((place, idx) => {
            const isFront = idx === 0;
            const distanceLabel = formatDistance(currentUser, place);
            return (
              <StackCardWrapper key={place.id} dragX={dragX} index={idx}>
                <Card
                  place={place}
                  partner={partner}
                  currentUser={currentUser}
                  onSwipe={handleSwipe}
                  isFront={isFront}
                  dragX={dragX}
                  distanceLabel={distanceLabel}
                />
              </StackCardWrapper>
            );
          })
          .reverse()}
      </div>

      <div className="absolute bottom-6 flex items-center gap-8 z-50">
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 bg-dark-900/80 backdrop-blur-xl rounded-full flex items-center justify-center border border-red-500/30 text-red-400 shadow-2xl"
        >
          <X size={32} strokeWidth={3} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => handleSwipe('right')}
          className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-orange-400 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-dark-900"
        >
          <Heart size={36} strokeWidth={3} fill="currentColor" />
        </motion.button>
      </div>
    </div>
  );
};

const StackCardWrapper: React.FC<{ children: React.ReactNode; dragX: MotionValue<number>; index: number }> = ({
  children,
  dragX,
  index,
}) => {
  if (index === 0) {
    return <div className="absolute inset-0 z-50">{children}</div>;
  }

  const cardOffset = 18;
  const cardScale = 0.04;

  const baseScale = 1 - index * cardScale;
  const targetScale = 1 - (index - 1) * cardScale;

  const baseY = index * cardOffset;
  const targetY = (index - 1) * cardOffset;

  const baseOpacity = 1 - index * 0.25;
  const targetOpacity = 1 - (index - 1) * 0.25;

  const scale = useTransform(dragX, [-200, 0, 200], [targetScale, baseScale, targetScale]);
  const y = useTransform(dragX, [-200, 0, 200], [targetY, baseY, targetY]);
  const opacity = useTransform(dragX, [-200, 0, 200], [targetOpacity, baseOpacity, targetOpacity]);

  return (
    <motion.div style={{ scale, y, opacity }} className="absolute inset-0 z-0 origin-bottom">
      {children}
    </motion.div>
  );
};

export default SwipeDeck;
