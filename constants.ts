
import { User, Place } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  name: 'Alex',
  age: 24,
  bio: 'Coffee enthusiast and night owl.',
  photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
  isVerified: true,
  distance: '0km',
  location: { lat: 11.5880, lng: 43.1450 }, // Djibouti City Center
  preferences: {
    vibes: ['Cozy', 'Lively', 'Casual'],
    placeTypes: ['Cafe', 'Arcade', 'Bar'],
    maxDistance: 5
  }
};

export const PARTNER_USER: User = {
  id: 'partner',
  name: 'Helen',
  age: 23,
  bio: 'Looking for the best rooftop bars.',
  photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
  isVerified: true,
  distance: '1.2km',
  location: { lat: 11.5920, lng: 43.1480 },
  preferences: {
    vibes: ['Romantic', 'Lively', 'Classy'],
    placeTypes: ['Cocktail Bar', 'Restaurant', 'Rooftop'],
    maxDistance: 10
  }
};

export const MOCK_CONNECTED_USERS: (User & { country: string })[] = [
  // Djibouti (Djibouti Cluster) - Default Active
  { ...PARTNER_USER, country: 'Djibouti' },
  {
    id: 'dj_1',
    name: 'Fatouma',
    age: 22,
    bio: 'Red Sea sunsets.',
    photoUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop',
    isVerified: true,
    distance: '1km',
    location: { lat: 11.5850, lng: 43.1500 }, // Near Port
    preferences: PARTNER_USER.preferences,
    country: 'Djibouti'
  },
  {
    id: 'dj_2',
    name: 'Hassan',
    age: 25,
    bio: 'Diving instructor.',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    isVerified: true,
    distance: '2km',
    location: { lat: 11.5950, lng: 43.1400 }, // Heron area
    preferences: PARTNER_USER.preferences,
    country: 'Djibouti'
  },
  {
    id: 'dj_3',
    name: 'Aisha',
    age: 21,
    bio: 'Coffee culture.',
    photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop',
    isVerified: false,
    distance: '0.8km',
    location: { lat: 11.5800, lng: 43.1420 }, // City Center
    preferences: PARTNER_USER.preferences,
    country: 'Djibouti'
  },
  {
    id: 'dj_4',
    name: 'Omar',
    age: 27,
    bio: 'Exploring the Horn.',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop',
    isVerified: true,
    distance: '3km',
    location: { lat: 11.6000, lng: 43.1550 }, // Near Kempinski
    preferences: PARTNER_USER.preferences,
    country: 'Djibouti'
  },
  {
    id: 'dj_5',
    name: 'Samira',
    age: 24,
    bio: 'City lights.',
    photoUrl: 'https://images.unsplash.com/photo-1522512115668-c09775d6f424?q=80&w=1000&auto=format&fit=crop',
    isVerified: true,
    distance: '1.5km',
    location: { lat: 11.5900, lng: 43.1350 }, // Quartier 1
    preferences: PARTNER_USER.preferences,
    country: 'Djibouti'
  },

  // USA (New York Cluster)
  {
    id: 'usa_1',
    name: 'James',
    age: 26,
    bio: 'NYC vibes.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    isVerified: true,
    distance: '0.5km',
    location: { lat: 40.7300, lng: -73.9950 },
    preferences: PARTNER_USER.preferences,
    country: 'USA'
  },
  {
    id: 'usa_2',
    name: 'Mike',
    age: 27,
    bio: 'Tech founder.',
    photoUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop',
    isVerified: true,
    distance: '1.5km',
    location: { lat: 40.7580, lng: -73.9855 }, // Times Square ish
    preferences: PARTNER_USER.preferences,
    country: 'USA'
  },

  // France (Paris Cluster)
  {
    id: 'fr_1',
    name: 'Sarah',
    age: 22,
    bio: 'Art lover in Paris.',
    photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop',
    isVerified: true,
    distance: '2km',
    location: { lat: 48.8566, lng: 2.3522 },
    preferences: PARTNER_USER.preferences,
    country: 'France'
  },
  {
    id: 'fr_2',
    name: 'Elise',
    age: 21,
    bio: 'Fashion designer.',
    photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop',
    isVerified: true,
    distance: '1.5km',
    location: { lat: 48.8606, lng: 2.3376 }, // Louvre
    preferences: PARTNER_USER.preferences,
    country: 'France'
  },

  // Japan (Tokyo Cluster)
  {
    id: 'jp_1',
    name: 'Kenji',
    age: 25,
    bio: 'Tokyo drifter.',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    isVerified: true,
    distance: '5km',
    location: { lat: 35.6762, lng: 139.6503 },
    preferences: PARTNER_USER.preferences,
    country: 'Japan'
  },
  {
    id: 'jp_2',
    name: 'Yuki',
    age: 23,
    bio: 'Harajuku girl.',
    photoUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop',
    isVerified: true,
    distance: '5.2km',
    location: { lat: 35.6700, lng: 139.7000 }, // Harajuku
    preferences: PARTNER_USER.preferences,
    country: 'Japan'
  },

  // UK (London Cluster)
  {
    id: 'uk_1',
    name: 'Priya',
    age: 24,
    bio: 'London calling.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    isVerified: false,
    distance: '3km',
    location: { lat: 51.5074, lng: -0.1278 }, // Central London
    preferences: PARTNER_USER.preferences,
    country: 'UK'
  },
  {
    id: 'uk_2',
    name: 'Oliver',
    age: 29,
    bio: 'Pub trivia champ.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
    isVerified: true,
    distance: '3.5km',
    location: { lat: 51.5200, lng: -0.0900 }, // Shoreditch
    preferences: PARTNER_USER.preferences,
    country: 'UK'
  }
];

// Real-world Djibouti locations for "Real Data" simulation
export const PLACES: Place[] = [
  // --- LUXURY / VIP ---
  {
    id: 'dj_luxe_1',
    name: 'Sky Lounge Kempinski',
    type: 'Lounge Bar',
    vibe: 'Luxury',
    priceLevel: '$$$$',
    description: 'The ultimate VIP experience in Djibouti. This rooftop lounge at the Kempinski Palace offers breathtaking panoramic views of the Red Sea. Perfect for a sophisticated date with premium cocktails and sunset vibes.',
    photoUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/49969344.jpg?k=336048123456789',
    photos: [
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/49969344.jpg?k=336048123456789',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/e4/f0/5c/dusk-at-sky-lounge.jpg?w=600&h=-1&s=1',
        'https://cf.bstatic.com/xdata/images/hotel/max1280x900/49969363.jpg?k=6a30c5a2c42c1c1c8a1c1c1c1c1c1c1c'
    ],
    rating: 4.9,
    lat: 11.6050,
    lng: 43.1600,
    features: ['Ocean View', 'Live Piano', 'Premium Cocktails', 'VIP Service']
  },
  {
    id: 'dj_luxe_2',
    name: 'Melting Pot',
    type: 'Fusion Restaurant',
    vibe: 'Romantic',
    priceLevel: '$$$',
    description: 'An oasis in the city. The Melting Pot offers a unique fusion of French, Japanese (Sushi), and local flavors. The garden setting with fairy lights creates an incredibly romantic atmosphere for dinner.',
    photoUrl: 'https://lh5.googleusercontent.com/p/AF1QipN3-z0G2l6X5w5Q8v7g9x8X6b4c3d2e1f0a9b8=w408-h306-k-no',
    photos: [
        'https://lh5.googleusercontent.com/p/AF1QipN3-z0G2l6X5w5Q8v7g9x8X6b4c3d2e1f0a9b8=w408-h306-k-no',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/c6/8e/3a/melting-pot.jpg?w=600&h=400&s=1',
        'https://media-cdn.tripadvisor.com/media/photo-s/17/7d/50/20/camel-steak.jpg'
    ],
    rating: 4.7,
    lat: 11.5970,
    lng: 43.1510,
    features: ['Sushi', 'Garden Patio', 'Fusion Cuisine', 'Camel Steak']
  },
  {
    id: 'dj_luxe_3',
    name: 'La Chaumière',
    type: 'French Restaurant',
    vibe: 'Classy',
    priceLevel: '$$$',
    description: 'A historic staple of Djibouti dining located in Place Menelik. Known for its distinct colonial architecture and high-end French gastronomy. The place to go for lobster and fine wine.',
    photoUrl: 'https://lh5.googleusercontent.com/p/AF1QipO9_0_1_2_3_4_5_6_7_8_9_0_1_2_3_4_5=w408-h306-k-no',
    photos: [
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/df/9f/8e/terrasse.jpg?w=600&h=400&s=1',
        'https://media-cdn.tripadvisor.com/media/photo-s/12/34/56/78/interior.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/aa/bb/seafood-platter.jpg'
    ],
    rating: 4.6,
    lat: 11.5930,
    lng: 43.1480,
    features: ['Historic', 'Seafood', 'Fine Wine', 'City Center']
  },

  // --- CASUAL / ACCESSIBLE ---
  {
    id: 'dj_cas_1',
    name: 'Saba Restaurant',
    type: 'Yemeni Cuisine',
    vibe: 'Cultural',
    priceLevel: '$$',
    description: 'Experience the authentic taste of the region. Famous for its "Moukpatzi" (fish) and huge portions of Yemeni rice. A lively, loud, and culturally rich experience shared with locals.',
    photoUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/23/63/1e/saba-restaurant.jpg?w=600&h=400&s=1',
    photos: [
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/23/63/1e/saba-restaurant.jpg?w=600&h=400&s=1',
        'https://media-cdn.tripadvisor.com/media/photo-s/15/a1/b2/c3/fish-dish.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/09/87/65/43/traditional-seating.jpg'
    ],
    rating: 4.5,
    lat: 11.5900,
    lng: 43.1420,
    features: ['Yemeni Fish', 'Group Dining', 'Halal', 'Local Favorite']
  },
  {
    id: 'dj_cas_2',
    name: 'Café de la Gare',
    type: 'Historic Cafe',
    vibe: 'Cozy',
    priceLevel: '$$',
    description: 'Located in the old train station building, this cafe oozes charm and history. It is the perfect spot for a relaxed afternoon coffee, a light croissant, or a casual meetup away from the heat.',
    photoUrl: 'https://lh5.googleusercontent.com/p/AF1QipM-1_2_3_4_5_6_7_8_9_0_1_2_3_4_5=w408-h306-k-no',
    photos: [
        'https://media-cdn.tripadvisor.com/media/photo-s/1a/2b/3c/4d/cafe-exterior.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0d/ef/12/34/coffee-time.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/11/22/33/44/historic-vibe.jpg'
    ],
    rating: 4.4,
    lat: 11.5890,
    lng: 43.1460,
    features: ['Coffee', 'Historic Building', 'Patio', 'Breakfast']
  },
  {
    id: 'dj_cas_3',
    name: 'Club Hermes',
    type: 'Nightclub',
    vibe: 'Party',
    priceLevel: '$$',
    description: 'For those who want to dance until dawn. Club Hermes is a staple of Djibouti nightlife with thumping music, neon lights, and a crowd ready to party. Not for the faint of heart!',
    photoUrl: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop',
    photos: [
        'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.2,
    lat: 11.5910,
    lng: 43.1490,
    features: ['DJ', 'Dance Floor', 'Late Night', 'Drinks']
  },
  {
    id: 'dj_cas_4',
    name: 'Pizzaiolo',
    type: 'Pizzeria',
    vibe: 'Casual',
    priceLevel: '$$',
    description: 'The best wood-fired pizza in town. A simple, unpretentious spot where the focus is entirely on the dough and fresh toppings. Great for a quick, delicious date.',
    photoUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop',
    photos: [
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.6,
    lat: 11.5940,
    lng: 43.1440,
    features: ['Wood-fired Pizza', 'Takeout', 'Italian', 'Family Friendly']
  }
];

export const MAP_STYLE_DARK = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
