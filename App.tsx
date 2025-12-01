

import React, { useState, useEffect, useRef } from 'react';
import { ViewState, User, Place } from './types';
import { CURRENT_USER, MOCK_CONNECTED_USERS, PLACES } from './constants';
import MapLayer from './components/MapLayer';
import SwipeDeck from './components/SwipeDeck';
import MatchOverlay from './components/MatchOverlay';
import ChatInterface from './components/ChatInterface';
import Navigation from './components/Navigation';
import { SlidersHorizontal, Menu, Globe, Check, Sparkles, ArrowRight, X, Clock, MapPin, Navigation as NavIcon, Star, ChefHat, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- PLACE DETAIL CARD COMPONENT ---
interface PlaceDetailCardProps {
    place: Place;
    onClose: () => void;
}

const PlaceDetailCard: React.FC<PlaceDetailCardProps> = ({ place, onClose }) => {
    const [activeTab, setActiveTab] = useState<'info' | 'menu'>('info');
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 w-full bg-dark-900 rounded-t-[32px] overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 max-h-[85vh] flex flex-col pointer-events-auto"
        >
            {/* Drag Handle */}
            <div className="w-full flex justify-center pt-3 pb-1" onClick={onClose}>
                <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
            </div>

            {/* Header Images (Scrollable) */}
            <div className="relative w-full h-64 shrink-0">
                 <div className="absolute top-4 right-4 z-50">
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                        <X size={16} />
                    </button>
                 </div>
                 
                 <div className="flex overflow-x-auto snap-x snap-mandatory h-full scrollbar-hide">
                    {place.photos.map((photo, i) => (
                        <div key={i} className="w-full shrink-0 snap-center relative">
                            <img src={photo} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
                        </div>
                    ))}
                 </div>
                 
                 <div className="absolute bottom-4 left-6 z-10">
                    <div className="flex gap-2 mb-1">
                        <span className="bg-gold-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">{place.type}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border border-white/20 ${place.isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
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

            {/* Tabs */}
            <div className="flex border-b border-white/10 px-6 mt-2">
                <button 
                    onClick={() => setActiveTab('info')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'info' ? 'border-gold-500 text-white' : 'border-transparent text-white/40'}`}
                >
                    Overview
                </button>
                <button 
                    onClick={() => setActiveTab('menu')}
                    className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'menu' ? 'border-gold-500 text-white' : 'border-transparent text-white/40'}`}
                >
                    Menu
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 pb-24 bg-dark-900">
                {activeTab === 'info' ? (
                    <div className="space-y-6">
                        {/* Real-time Status */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-dark-800 p-3 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 mb-1 text-white/60 text-xs">
                                    <Clock size={14} />
                                    <span>Hours Today</span>
                                </div>
                                <p className="text-white font-semibold">{place.openTime} - {place.closeTime}</p>
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
                                {place.features.map(f => (
                                    <span key={f} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/80 border border-white/10">
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {place.menu && place.menu.length > 0 ? place.menu.map((section, idx) => (
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
                        )) : (
                            <div className="text-center py-10 text-white/40">
                                <Info size={32} className="mx-auto mb-2 opacity-50" />
                                <p>Menu details unavailable</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer Actions */}
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
}


// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [matchedPlace, setMatchedPlace] = useState<Place | null>(null);
  
  // Filter & Selection State
  const [filterCountry, setFilterCountry] = useState<string>('Djibouti');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(MOCK_CONNECTED_USERS.filter(u => u.country === 'Djibouti'));
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const countries = ['All', 'Djibouti', 'USA', 'France', 'Japan', 'UK'];

  const getFilteredUsers = (country: string) => {
    return country === 'All' 
        ? MOCK_CONNECTED_USERS 
        : MOCK_CONNECTED_USERS.filter(u => u.country === country);
  }

  const handleCountryChange = (country: string) => {
      setFilterCountry(country);
      setFilteredUsers(getFilteredUsers(country));
      setSelectedUser(null);
      setSelectedPlace(null);
  };

  const handleMapBackgroundClick = () => {
      setSelectedUser(null);
      setSelectedPlace(null);
  };

  const handleUserSelect = (user: User) => {
      setSelectedPlace(null); // Clear place selection
      setSelectedUser(user);
  }

  const handlePlaceSelect = (place: Place) => {
      setSelectedUser(null); // Clear user selection
      setSelectedPlace(place);
  }

  // Home View Component
  const HomeView = () => (
    <div className="relative h-full w-full flex flex-col pt-20 px-6 pointer-events-none">
        {/* Top Header & Filter (Only visible if no Place is selected to avoid clutter) */}
        {!selectedPlace && (
        <div className="absolute top-0 left-0 w-full p-6 flex flex-col gap-4 z-50 pointer-events-auto bg-gradient-to-b from-dark-900/90 to-transparent pb-12">
            <div className="flex justify-between items-center w-full">
                <button className="w-10 h-10 rounded-full bg-dark-800/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-dark-700 transition-colors">
                    <Menu size={20} />
                </button>
                
                <div className="flex items-center gap-2">
                    <Globe size={14} className="text-gold-500 animate-pulse" />
                    <span className="text-xs font-semibold text-white/80">{filteredUsers.length} Online</span>
                </div>

                <button className="w-10 h-10 rounded-full bg-dark-800/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-dark-700 transition-colors">
                    <SlidersHorizontal size={20} />
                </button>
            </div>

            {/* Country Filters */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full py-2">
                {countries.map(country => (
                    <button 
                        key={country}
                        onClick={() => handleCountryChange(country)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 border ${
                            filterCountry === country 
                            ? 'bg-gold-500 text-black border-gold-500 shadow-lg shadow-gold-500/20' 
                            : 'bg-dark-800/60 text-white/60 border-white/10 hover:bg-dark-700 hover:text-white'
                        }`}
                    >
                        {country}
                    </button>
                ))}
            </div>
        </div>
        )}

        {/* Selected User Card (Teardrop) */}
        <AnimatePresence mode='wait'>
            {selectedUser && (
                <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-40 pointer-events-none">
                     <motion.div 
                        key={selectedUser.id}
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative group cursor-pointer pointer-events-auto"
                     >
                        <motion.button 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => setSelectedUser(null)}
                            className="absolute -top-12 right-0 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center border border-white/10 z-50 transition-colors"
                        >
                            <X size={16} />
                        </motion.button>

                        <div className="w-36 h-36 rounded-full p-1.5 bg-gradient-to-b from-gold-400 via-gold-500 to-transparent shadow-[0_0_40px_rgba(234,179,8,0.4)]">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-dark-900 relative">
                                 <img src={selectedUser.photoUrl} className="w-full h-full object-cover" alt={selectedUser.name} />
                            </div>
                        </div>
                        
                        <svg className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 text-gold-500 filter drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 22h20L12 2z" transform="rotate(180 12 12)"/>
                        </svg>

                         <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 min-w-[220px]">
                             <div className="glass-panel p-4 rounded-2xl text-center backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-3">
                                 <div>
                                     <div className="flex items-center justify-center gap-2 mb-1">
                                        <h2 className="text-xl font-bold text-white tracking-tight">{selectedUser.name}, {selectedUser.age}</h2>
                                        {selectedUser.isVerified && (
                                            <div className="bg-blue-500 rounded-full p-0.5 shadow-sm">
                                                <Check size={10} className="text-white" strokeWidth={4} />
                                            </div>
                                        )}
                                     </div>
                                     <div className="flex items-center justify-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                                        <span className="text-xs text-white/70 font-medium">In real time</span>
                                     </div>
                                 </div>

                                 <button 
                                    onClick={() => setView(ViewState.SWIPE)}
                                    className="w-full py-2 bg-gold-500 hover:bg-gold-400 text-black text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                                 >
                                    <Sparkles size={14} className="fill-black" />
                                    Match Now
                                 </button>
                             </div>
                         </div>
                     </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* Selected Place Card (Bottom Sheet) */}
        <AnimatePresence>
            {selectedPlace && (
                <PlaceDetailCard place={selectedPlace} onClose={() => setSelectedPlace(null)} />
            )}
        </AnimatePresence>

         <AnimatePresence>
            {selectedUser && (
                <div className="absolute bottom-32 right-6 pointer-events-auto z-40">
                    <motion.button 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setView(ViewState.SWIPE)}
                        className="w-14 h-14 rounded-full bg-dark-800/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl hover:bg-dark-700 transition-colors"
                    >
                        <ArrowRight size={24} />
                    </motion.button>
                </div>
            )}
         </AnimatePresence>
    </div>
  );

  return (
    <div className="relative w-full h-screen bg-dark-900 overflow-hidden text-white font-sans">
      
      {/* Background Map - Interactive in Home View */}
      <MapLayer 
        className={view === ViewState.CHAT ? 'hidden' : ''} 
        interactive={view === ViewState.HOME}
        users={filteredUsers}
        places={PLACES} 
        selectedUser={selectedUser || undefined}
        selectedPlace={selectedPlace || undefined}
        onUserSelect={handleUserSelect}
        onMapClick={handleMapBackgroundClick}
        onPlaceSelect={handlePlaceSelect}
      />

      {/* Main Content Area */}
      <main className="relative h-full w-full z-10 pointer-events-none">
        <div className={`h-full ${view === ViewState.HOME ? 'pointer-events-none' : 'pointer-events-auto'}`}>
            {view === ViewState.HOME && <HomeView />}
            
            {view === ViewState.SWIPE && (
            <SwipeDeck 
                places={PLACES} 
                currentUser={CURRENT_USER}
                partner={selectedUser || MOCK_CONNECTED_USERS[0]}
                onMatch={(place) => {
                    setMatchedPlace(place);
                    setView(ViewState.MATCH);
                }} 
            />
            )}
            
            {view === ViewState.MATCH && matchedPlace && (
            <MatchOverlay 
                partner={selectedUser || MOCK_CONNECTED_USERS[0]} 
                place={matchedPlace} 
                onStartChat={() => setView(ViewState.CHAT)}
                onDismiss={() => setView(ViewState.SWIPE)}
            />
            )}

            {view === ViewState.CHAT && matchedPlace && (
            <ChatInterface 
                partner={selectedUser || MOCK_CONNECTED_USERS[0]}
                place={matchedPlace}
                onBack={() => setView(ViewState.HOME)}
            />
            )}
        </div>
      </main>

      {/* Navigation - Hide on Chat/Match screens or when place detail is open */}
      {view !== ViewState.CHAT && view !== ViewState.MATCH && !selectedPlace && (
          <Navigation currentView={view} setView={setView} />
      )}

    </div>
  );
};

export default App;