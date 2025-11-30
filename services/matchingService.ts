import { Place, User } from '../types';

/**
 * Calculates a compatibility score (0-100) between a place and two users (current user + partner).
 * Considers:
 * 1. Vibe matching (does the place vibe match users' preferences?)
 * 2. Type matching (is it a preferred place type?)
 * 3. Distance (proximity to user)
 */
export const calculateCompatibility = (place: Place, currentUser: User, partner: User): { score: number; matchReasons: string[] } => {
  let score = 60; // Base score
  const matchReasons: string[] = [];

  // 1. Vibe Check
  const userLikesVibe = currentUser.preferences.vibes.includes(place.vibe);
  const partnerLikesVibe = partner.preferences.vibes.includes(place.vibe);

  if (userLikesVibe && partnerLikesVibe) {
    score += 25;
    matchReasons.push('Perfect Vibe Match');
  } else if (userLikesVibe || partnerLikesVibe) {
    score += 10;
    if (userLikesVibe) matchReasons.push('You like this vibe');
    if (partnerLikesVibe) matchReasons.push(`${partner.name} likes this vibe`);
  }

  // 2. Type Check
  const userLikesType = currentUser.preferences.placeTypes.includes(place.type);
  const partnerLikesType = partner.preferences.placeTypes.includes(place.type);

  if (userLikesType || partnerLikesType) {
    score += 10;
  }

  // 3. Distance Logic (Simplified using lat/lng difference)
  // Approx: 0.01 deg lat/lng is ~1.1km
  const distLat = Math.abs(place.lat - currentUser.location.lat);
  const distLng = Math.abs(place.lng - currentUser.location.lng);
  const roughDistKm = Math.sqrt(distLat * distLat + distLng * distLng) * 111;

  if (roughDistKm < 1) {
    score += 5;
    matchReasons.push('Very Close');
  } else if (roughDistKm > currentUser.preferences.maxDistance) {
    score -= 20;
  }

  // 4. Rating Boost
  if (place.rating > 4.7) score += 5;

  return {
    score: Math.min(Math.max(score, 0), 99), // Clamp between 0 and 99
    matchReasons
  };
};