import React, { useState, useMemo, useCallback } from 'react';
import { ViewState, User, Place } from './types';
import { CURRENT_USER, MOCK_CONNECTED_USERS, PLACES } from './constants';
import MapLayer from './components/MapLayer';
import SwipeDeck from './components/SwipeDeck';
import MatchOverlay from './components/MatchOverlay';
import ChatInterface from './components/ChatInterface';
import Navigation from './components/Navigation';
import HomeView from './components/HomeView';

const COUNTRIES = ['All', 'Djibouti', 'USA', 'France', 'Japan', 'UK'];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [matchedPlace, setMatchedPlace] = useState<Place | null>(null);
  const [filterCountry, setFilterCountry] = useState<string>('Djibouti');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const filteredUsers = useMemo(() => {
    return filterCountry === 'All'
      ? MOCK_CONNECTED_USERS
      : MOCK_CONNECTED_USERS.filter((user) => user.country === filterCountry);
  }, [filterCountry]);

  const handleCountryChange = useCallback((country: string) => {
    setFilterCountry(country);
    setSelectedUser(null);
    setSelectedPlace(null);
  }, []);

  const handleMapBackgroundClick = useCallback(() => {
    setSelectedUser(null);
    setSelectedPlace(null);
  }, []);

  const handleUserSelect = useCallback((user: User) => {
    setSelectedPlace(null);
    setSelectedUser(user);
  }, []);

  const handlePlaceSelect = useCallback((place: Place) => {
    setSelectedUser(null);
    setSelectedPlace(place);
  }, []);

  return (
    <div className="relative w-full h-screen bg-dark-900 overflow-hidden text-white font-sans">
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

      <main className="relative h-full w-full z-10 pointer-events-none">
        <div className={`h-full ${view === ViewState.HOME ? 'pointer-events-none' : 'pointer-events-auto'}`}>
          {view === ViewState.HOME && (
            <HomeView
              filteredUsers={filteredUsers}
              selectedUser={selectedUser}
              selectedPlace={selectedPlace}
              filterCountry={filterCountry}
              countries={COUNTRIES}
              onCountryChange={handleCountryChange}
              onUserDeselect={() => setSelectedUser(null)}
              onPlaceDeselect={() => setSelectedPlace(null)}
              onNavigateToSwipe={() => setView(ViewState.SWIPE)}
            />
          )}

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

      {view !== ViewState.CHAT && view !== ViewState.MATCH && !selectedPlace && (
        <Navigation currentView={view} setView={setView} />
      )}
    </div>
  );
};

export default App;
