

import React, { useEffect, useRef } from 'react';
import { MAP_STYLE_DARK } from '../constants';
import { User, Place } from '../types';

declare global {
  interface Window {
    L: any;
  }
}

interface MapLayerProps {
  className?: string;
  interactive?: boolean;
  users?: User[];
  places?: Place[];
  selectedUser?: User;
  selectedPlace?: Place;
  onUserSelect?: (user: User) => void;
  onMapClick?: () => void;
  onPlaceSelect?: (place: Place) => void;
}

const MapLayer: React.FC<MapLayerProps> = ({ 
  className, 
  interactive = false, 
  users = [],
  places = [],
  selectedUser,
  selectedPlace,
  onUserSelect,
  onMapClick,
  onPlaceSelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const placeMarkersRef = useRef<any[]>([]);
  const prevUsersRef = useRef<User[]>([]);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current || !window.L) return;

    const L = window.L;
    
    // Default View (will be updated by bounds logic)
    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: interactive,
      scrollWheelZoom: interactive,
      doubleClickZoom: interactive,
      zoomSnap: 0.1,
    }).setView([11.5880, 43.1450], 13);

    mapInstance.current = map;

    // Add dark tiles
    L.tileLayer(MAP_STYLE_DARK, {
      maxZoom: 20,
      opacity: 0.9, 
    }).addTo(map);
    
    // Handle Map Background Click
    map.on('click', () => {
        if (onMapClick) onMapClick();
    });

    // Cleanup
    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []); // Run once on mount

  // Update Interactive State
  useEffect(() => {
    if (!mapInstance.current) return;
    const map = mapInstance.current;
    if (interactive) {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.touchZoom.enable();
    } else {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();
      map.touchZoom.disable();
    }
  }, [interactive]);

  // Update User Markers
  useEffect(() => {
    if (!mapInstance.current || !window.L) return;
    const L = window.L;
    const map = mapInstance.current;

    // Clear existing user markers
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    const bounds = L.latLngBounds();
    let hasPoints = false;

    // Add new user markers
    users.forEach(user => {
      bounds.extend([user.location.lat, user.location.lng]);
      hasPoints = true;

      const isSelected = selectedUser?.id === user.id;

      if (isSelected) return; 

      const iconHtml = `
        <div class="marker-avatar transition-transform hover:scale-110">
           <img src="${user.photoUrl}" alt="${user.name}" />
        </div>
        ${user.isVerified ? `
        <div class="marker-badge">
           <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M1 3L3 5L7 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
        </div>` : ''}
        
        <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-dark-800/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
           <span class="text-[10px] font-bold text-white">${user.name}, ${user.age}</span>
        </div>
        
        <div class="absolute inset-0 rounded-full border border-gold-500/30 animate-ping opacity-20"></div>
      `;

      const icon = L.divIcon({
        className: `custom-user-marker z-10 group`,
        html: iconHtml,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
      });

      const marker = L.marker([user.location.lat, user.location.lng], { icon }).addTo(map);
      
      marker.on('click', (e: any) => {
        L.DomEvent.stopPropagation(e);
        if (onUserSelect) onUserSelect(user);
      });

      markersRef.current.push(marker);
    });

    // Intelligent Camera Movement (Fly to Users AND Places if Home view)
    // If no user/place is selected, fit bounds to show users + places to give a full view
    if (!selectedUser && !selectedPlace) {
        // Also extend bounds to include places so they are visible on load
        places.forEach(place => {
            bounds.extend([place.lat, place.lng]);
            hasPoints = true;
        });

        if (hasPoints) {
             map.flyToBounds(bounds, {
                paddingTopLeft: [50, 140],
                paddingBottomRight: [50, 50],
                maxZoom: 15,
                duration: 1.5,
                easeLinearity: 0.25
            });
        }
    }
    prevUsersRef.current = users;

  }, [users, places, selectedUser, selectedPlace, onUserSelect]);

  // Update Place Markers (Venues)
  useEffect(() => {
    if (!mapInstance.current || !window.L) return;
    const L = window.L;
    const map = mapInstance.current;

    // Clear existing place markers
    placeMarkersRef.current.forEach(m => map.removeLayer(m));
    placeMarkersRef.current = [];

    // Add place markers
    places.forEach(place => {
       const isSelected = selectedPlace?.id === place.id;
       
       const placeIconHtml = `
         <div class="relative w-full h-full group ${isSelected ? 'scale-125 z-50' : 'z-0'} transition-transform duration-500">
            <div class="absolute inset-0 ${isSelected ? 'bg-white border-gold-500' : 'bg-gold-500 border-black'} rounded-full border-2 flex items-center justify-center shadow-lg transition-transform group-hover:scale-125">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="${isSelected ? 'text-gold-500' : 'text-black'}">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                 </svg>
            </div>
            
            <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-0.5 rounded-md text-[10px] font-bold ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity whitespace-nowrap shadow-md pointer-events-none z-50">
                ${place.name}
            </div>
            ${isSelected ? `<div class="absolute inset-0 rounded-full border border-white animate-ping opacity-30"></div>` : ''}
         </div>
       `;

       const icon = L.divIcon({
          className: 'custom-place-marker',
          html: placeIconHtml,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
       });

       const marker = L.marker([place.lat, place.lng], { icon }).addTo(map);
       
       marker.on('click', (e: any) => {
          L.DomEvent.stopPropagation(e);
          if (onPlaceSelect) onPlaceSelect(place);
       });

       placeMarkersRef.current.push(marker);
    });

  }, [places, selectedPlace, onPlaceSelect]);

  // Smooth FlyTo Animation on User Select
  useEffect(() => {
     if (selectedUser && mapInstance.current) {
        mapInstance.current.flyTo(
            [selectedUser.location.lat, selectedUser.location.lng], 
            17,
            { 
                animate: true, 
                duration: 1.5,
                easeLinearity: 0.25
            }
        );
     }
  }, [selectedUser]);

   // Smooth FlyTo Animation on Place Select
  useEffect(() => {
     if (selectedPlace && mapInstance.current) {
        mapInstance.current.flyTo(
            [selectedPlace.lat, selectedPlace.lng], 
            17,
            { 
                animate: true, 
                duration: 1.2,
                easeLinearity: 0.2
            }
        );
     }
  }, [selectedPlace]);

  return (
    <div ref={mapRef} className={`w-full h-full absolute inset-0 z-0 ${className || ''}`} />
  );
};

export default MapLayer;