import { Place, User } from '../types';

export const MATCH_CONFIG = {
  BASE_SCORE: 60,
  PERFECT_VIBE_BONUS: 25,
  PARTIAL_VIBE_BONUS: 10,
  TYPE_MATCH_BONUS: 10,
  CLOSE_DISTANCE_BONUS: 5,
  FAR_DISTANCE_PENALTY: 20,
  HIGH_RATING_BONUS: 5,
  HIGH_RATING_THRESHOLD: 4.7,
  CLOSE_DISTANCE_KM: 1,
  MATCH_THRESHOLD: 70,
  MIN_SCORE: 0,
  MAX_SCORE: 99,
} as const;

export const calculateCompatibility = (
  place: Place,
  currentUser: User,
  partner: User
): { score: number; matchReasons: string[] } => {
  let score = MATCH_CONFIG.BASE_SCORE;
  const matchReasons: string[] = [];

  const userLikesVibe = currentUser.preferences.vibes.includes(place.vibe);
  const partnerLikesVibe = partner.preferences.vibes.includes(place.vibe);

  if (userLikesVibe && partnerLikesVibe) {
    score += MATCH_CONFIG.PERFECT_VIBE_BONUS;
    matchReasons.push('Perfect Vibe Match');
  } else if (userLikesVibe || partnerLikesVibe) {
    score += MATCH_CONFIG.PARTIAL_VIBE_BONUS;
    if (userLikesVibe) matchReasons.push('You like this vibe');
    if (partnerLikesVibe) matchReasons.push(`${partner.name} likes this vibe`);
  }

  const userLikesType = currentUser.preferences.placeTypes.includes(place.type);
  const partnerLikesType = partner.preferences.placeTypes.includes(place.type);

  if (userLikesType || partnerLikesType) {
    score += MATCH_CONFIG.TYPE_MATCH_BONUS;
  }

  const distLat = Math.abs(place.lat - currentUser.location.lat);
  const distLng = Math.abs(place.lng - currentUser.location.lng);
  const roughDistKm = Math.sqrt(distLat * distLat + distLng * distLng) * 111;

  if (roughDistKm < MATCH_CONFIG.CLOSE_DISTANCE_KM) {
    score += MATCH_CONFIG.CLOSE_DISTANCE_BONUS;
    matchReasons.push('Very Close');
  } else if (roughDistKm > currentUser.preferences.maxDistance) {
    score -= MATCH_CONFIG.FAR_DISTANCE_PENALTY;
  }

  if (place.rating > MATCH_CONFIG.HIGH_RATING_THRESHOLD) {
    score += MATCH_CONFIG.HIGH_RATING_BONUS;
  }

  return {
    score: Math.min(Math.max(score, MATCH_CONFIG.MIN_SCORE), MATCH_CONFIG.MAX_SCORE),
    matchReasons,
  };
};
