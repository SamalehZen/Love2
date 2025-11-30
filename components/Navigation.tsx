import React from 'react';
import { ViewState } from '../types';
import { Home, Search, Heart, MessageSquare, User } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.HOME, icon: Home, label: 'Home' },
    { id: ViewState.SWIPE, icon: Search, label: 'Discover' },
    { id: ViewState.MATCH, icon: Heart, label: 'Likes' }, // Simplified for demo
    { id: ViewState.CHAT, icon: MessageSquare, label: 'Chat' },
  ];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="glass-panel rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl">
            {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id)}
                        className={`relative flex flex-col items-center justify-center w-10 h-10 transition-all duration-300 ${isActive ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                    >
                        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        {isActive && (
                            <span className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />
                        )}
                    </button>
                )
            })}
        </div>
    </div>
  );
};

export default Navigation;
