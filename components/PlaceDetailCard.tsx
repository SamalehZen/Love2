import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Place } from '../types';
import { X, MapPin, Star, Navigation as NavIcon, Clock, ChefHat, Info } from 'lucide-react';

interface PlaceDetailCardProps {
  place: Place;
  onClose: () => void;
}

const PlaceDetailCard: React.FC<PlaceDetailCardProps> = ({ place, onClose }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'menu'>('info');

  useEffect(() => {
    setActiveTab('info');
  }, [place.id]);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute bottom-0 left-0 w-full bg-dark-900 rounded-t-[32px] overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 max-h-[85vh] flex flex-col pointer-events-auto md:max-h-[75vh] md:max-w-md md:mx-auto md:rounded-[32px] md:bottom-4 md:left-1/2 md:-translate-x-1/2"
    >
      <motion.div
        className="w-full flex justify-center pt-3 pb-1 cursor-pointer"
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          className="w-12 h-1.5 bg-white/20 rounded-full"
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
        />
      </motion.div>

      <div className="relative w-full h-64 shrink-0">
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory h-full scrollbar-hide">
          {(place.photos || []).map((photo, i) => (
            <div key={i} className="w-full shrink-0 snap-center relative">
              <img src={photo} alt={`${place.name} photo ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-6 z-10">
          <div className="flex gap-2 mb-1">
            <span className="bg-gold-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">{place.type}</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border border-white/20 ${
                place.isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}
            >
              {place.isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-1">{place.name}</h2>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <MapPin size={14} className="text-gold-500" />
            <span>Djibouti City</span>
            <span className="text-white/20">|</span>
            <Star size={14} className="text-gold-500 fill-gold-500" />
            <span className="text-white">{place.rating}</span>
            <span className="text-white/20">|</span>
            <span className="text-gold-500">{place.priceLevel}</span>
          </div>
        </div>
      </div>

      <div className="flex border-b border-white/10 px-6 mt-2">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'info' ? 'border-gold-500 text-white' : 'border-transparent text-white/40'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'menu' ? 'border-gold-500 text-white' : 'border-transparent text-white/40'
          }`}
        >
          Menu
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 bg-dark-900">
        {activeTab === 'info' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-800 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-1 text-white/60 text-xs">
                  <Clock size={14} />
                  <span>Hours Today</span>
                </div>
                <p className="text-white font-semibold">
                  {place.openTime} - {place.closeTime}
                </p>
              </div>
              <div className="bg-dark-800 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-1 text-white/60 text-xs">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Live Traffic</span>
                </div>
                <p className="text-white font-semibold">{place.busyLevel}</p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2">About</h3>
              <p className="text-white/70 text-sm leading-relaxed">{place.description}</p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {place.features.map((feature) => (
                  <span key={feature} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/80 border border-white/10">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {place.menu && place.menu.length > 0 ? (
              place.menu.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-gold-500 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ChefHat size={14} />
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-start pb-3 border-b border-white/5 last:border-0">
                        <div>
                          <p className="text-white font-medium text-sm">{item.name}</p>
                          {item.description && <p className="text-white/50 text-xs mt-0.5">{item.description}</p>}
                        </div>
                        <span className="text-white font-bold text-sm bg-white/10 px-2 py-0.5 rounded">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-white/40">
                <Info size={32} className="mx-auto mb-2 opacity-50" />
                <p>Menu details unavailable</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4 bg-dark-900/90 backdrop-blur-md border-t border-white/10 flex gap-3">
        <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors">
          Share
        </button>
        <button className="flex-[2] bg-gold-500 hover:bg-gold-400 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
          <NavIcon size={18} className="fill-black" />
          Navigate
        </button>
      </div>
    </motion.div>
  );
};

export default PlaceDetailCard;
