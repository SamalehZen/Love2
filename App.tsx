
import React, { useState, useEffect } from 'react';
import { ViewState, User, Place } from './types';
import { CURRENT_USER, MOCK_CONNECTED_USERS, PLACES } from './constants';
import MapLayer from './components/MapLayer';
import SwipeDeck from './components/SwipeDeck';
import MatchOverlay from './components/MatchOverlay';
import ChatInterface from './components/ChatInterface';
import Navigation from './components/Navigation';
import { SlidersHorizontal, Menu, Globe, Check, Sparkles, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [matchedPlace, setMatchedPlace] = useState<Place | null>(null);
  
  // Filter & User Selection State - Default to Djibouti
  const [filterCountry, setFilterCountry] = useState<string>('Djibouti');
  
  // Initialize filtered users
  const getFilteredUsers = (country: string) => {
    return country === 'All' 
        ? MOCK_CONNECTED_USERS 
        : MOCK_CONNECTED_USERS.filter(u => u.country === country);
  }

  const [filteredUsers, setFilteredUsers] = useState<User[]>(getFilteredUsers('Djibouti'));
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const countries = ['All', 'Djibouti', 'USA', 'France', 'Japan', 'UK'];

  const handleCountryChange = (country: string) => {
      setFilterCountry(country);
      const newUsers = getFilteredUsers(country);
      setFilteredUsers(newUsers);
      setSelectedUser(null); // Deselect user when changing country to allow manual selection
  };

  const handleMapBackgroundClick = () => {
      setSelectedUser(null);
  };

  // Home View Component
  const HomeView = () => (
    <div className="relative h-full w-full flex flex-col pt-20 px-6 pointer-events-none">
        {/* Top Header & Filter */}
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

        {/* Center Focus (Selected User Card) - Teardrop Design */}
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
                        {/* Close Button */}
                        <motion.button 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => setSelectedUser(null)}
                            className="absolute -top-12 right-0 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center border border-white/10 z-50 transition-colors"
                        >
                            <X size={16} />
                        </motion.button>

                        {/* The Teardrop Shape */}
                        <div className="w-36 h-36 rounded-full p-1.5 bg-gradient-to-b from-gold-400 via-gold-500 to-transparent shadow-[0_0_40px_rgba(234,179,8,0.4)]">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-dark-900 relative">
                                 <img src={selectedUser.photoUrl} className="w-full h-full object-cover" alt={selectedUser.name} />
                            </div>
                        </div>
                        
                        {/* Teardrop Point */}
                        <svg className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 text-gold-500 filter drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 22h20L12 2z" transform="rotate(180 12 12)"/>
                        </svg>

                         {/* Floating Info Card */}
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
        places={PLACES} // Pass real places to the map
        selectedUser={selectedUser || undefined}
        onUserSelect={setSelectedUser}
        onMapClick={handleMapBackgroundClick}
        onPlaceSelect={(place) => console.log('Place clicked', place)} // Placeholder logic
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

      {/* Navigation - Hide on Chat/Match screens */}
      {view !== ViewState.CHAT && view !== ViewState.MATCH && (
          <Navigation currentView={view} setView={setView} />
      )}

    </div>
  );
};

export default App;
