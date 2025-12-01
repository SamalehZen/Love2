

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
    description: 'The ultimate VIP experience in Djibouti. This rooftop lounge offers breathtaking panoramic views of the Red Sea. Perfect for a sophisticated date with premium cocktails and sunset vibes.',
    photoUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/49969344.jpg?k=336048123456789',
    photos: [
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/49969344.jpg?k=336048123456789',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/e4/f0/5c/dusk-at-sky-lounge.jpg?w=600&h=-1&s=1',
        'https://cf.bstatic.com/xdata/images/hotel/max1280x900/49969363.jpg?k=6a30c5a2c42c1c1c8a1c1c1c1c1c1c1c',
        'https://media-cdn.tripadvisor.com/media/photo-s/05/92/7d/52/kempinski-hotel-djibouti.jpg'
    ],
    rating: 4.9,
    lat: 11.6050,
    lng: 43.1600,
    features: ['Ocean View', 'Live Piano', 'Premium Cocktails', 'VIP Service'],
    isOpen: true,
    busyLevel: 'Moderate',
    openTime: '17:00',
    closeTime: '02:00',
    menu: [
        {
            title: 'Cocktails',
            items: [
                { name: 'Red Sea Sunset', price: '2500 DJF', description: 'Gin, fresh pomegranate, lime, rosemary' },
                { name: 'Djibouti Gold', price: '3000 DJF', description: 'Premium whiskey, honey, gold leaf' },
                { name: 'Palace Martini', price: '2200 DJF', description: 'Classic martini with grey goose' }
            ]
        },
        {
            title: 'Tapas',
            items: [
                { name: 'Lobster Bites', price: '4500 DJF', description: 'Fresh lobster tempura with saffron aioli' },
                { name: 'Wagyu Sliders', price: '3800 DJF', description: 'Mini burgers with truffle mayo' }
            ]
        }
    ]
  },
  {
    id: 'dj_luxe_2',
    name: 'Melting Pot',
    type: 'Fusion Restaurant',
    vibe: 'Romantic',
    priceLevel: '$$$',
    description: 'An oasis in the city. The Melting Pot offers a unique fusion of French, Japanese (Sushi), and local flavors. The garden setting with fairy lights creates an incredibly romantic atmosphere.',
    photoUrl: 'https://lh5.googleusercontent.com/p/AF1QipN3-z0G2l6X5w5Q8v7g9x8X6b4c3d2e1f0a9b8=w408-h306-k-no',
    photos: [
        'https://lh5.googleusercontent.com/p/AF1QipN3-z0G2l6X5w5Q8v7g9x8X6b4c3d2e1f0a9b8=w408-h306-k-no',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/c6/8e/3a/melting-pot.jpg?w=600&h=400&s=1',
        'https://media-cdn.tripadvisor.com/media/photo-s/17/7d/50/20/camel-steak.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0f/c6/8e/6a/melting-pot.jpg'
    ],
    rating: 4.7,
    lat: 11.5970,
    lng: 43.1510,
    features: ['Sushi', 'Garden Patio', 'Fusion Cuisine', 'Camel Steak'],
    isOpen: true,
    busyLevel: 'Busy',
    openTime: '12:00',
    closeTime: '23:30',
    menu: [
        {
            title: 'Japanese Fusion',
            items: [
                { name: 'Dragon Roll', price: '2800 DJF', description: 'Eel, avocado, cucumber' },
                { name: 'Camel Steak', price: '3500 DJF', description: 'Tender camel filet with peppercorn sauce' }
            ]
        },
        {
            title: 'Mains',
            items: [
                { name: 'Grilled Red Snapper', price: '3200 DJF', description: 'Local catch with lemon butter' }
            ]
        }
    ]
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
        'https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/aa/bb/seafood-platter.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0b/df/a0/0a/la-salle.jpg'
    ],
    rating: 4.6,
    lat: 11.5930,
    lng: 43.1480,
    features: ['Historic', 'Seafood', 'Fine Wine', 'City Center'],
    isOpen: true,
    busyLevel: 'Quiet',
    openTime: '11:00',
    closeTime: '23:00',
    menu: [
        {
            title: 'Les Classiques',
            items: [
                { name: 'Escargots de Bourgogne', price: '2200 DJF', description: 'Garlic butter snails' },
                { name: 'Lobster Thermidor', price: '5500 DJF', description: 'Whole lobster in creamy sauce' }
            ]
        }
    ]
  },
  {
    id: 'dj_luxe_4',
    name: 'La Mer Rouge',
    type: 'Seafood Restaurant',
    vibe: 'Elegant',
    priceLevel: '$$$',
    description: 'Specializing in fresh catch from the Red Sea. La Mer Rouge offers an elegant dining experience with a focus on lobster, crab, and grilled fish, served in a refined atmosphere.',
    photoUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/07/32/1a/59/la-mer-rouge.jpg',
    photos: [
        'https://media-cdn.tripadvisor.com/media/photo-s/07/32/1a/59/la-mer-rouge.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/1a/b2/c3/d4/seafood-platter.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0e/11/22/33/lobster.jpg'
    ],
    rating: 4.5,
    lat: 11.5850,
    lng: 43.1550,
    features: ['Fresh Seafood', 'Elegant', 'Lobster Special', 'Business Dining'],
    isOpen: true,
    busyLevel: 'Moderate',
    openTime: '12:00',
    closeTime: '22:30',
    menu: [
        {
            title: 'Seafood',
            items: [
                { name: 'Seafood Platter', price: '6000 DJF', description: 'Lobster, prawns, calamari, fish' },
                { name: 'Crab Curry', price: '3800 DJF', description: 'Spicy coconut curry' }
            ]
        }
    ]
  },
  {
    id: 'dj_luxe_5',
    name: 'L\'Historil',
    type: 'French Brasserie',
    vibe: 'Classic',
    priceLevel: '$$$',
    description: 'A classic French brasserie near Place Menelik. Known for its steady quality, steak frites, and professional service. A favorite among expats and business travelers.',
    photoUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/06/52/64/09/l-historil.jpg',
    photos: [
        'https://media-cdn.tripadvisor.com/media/photo-s/06/52/64/09/l-historil.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0a/1b/2c/3d/steak-frites.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0d/4e/5f/6g/entrance.jpg'
    ],
    rating: 4.3,
    lat: 11.5925,
    lng: 43.1475,
    features: ['French Classics', 'Steak', 'Full Bar', 'Central'],
    isOpen: true,
    busyLevel: 'Moderate',
    openTime: '07:00',
    closeTime: '23:00',
    menu: [
        {
            title: 'Mains',
            items: [
                { name: 'Steak Frites', price: '2800 DJF', description: 'Entrecote with french fries' },
                { name: 'Confit de Canard', price: '3200 DJF', description: 'Duck leg confit' }
            ]
        }
    ]
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
    features: ['Yemeni Fish', 'Group Dining', 'Halal', 'Local Favorite'],
    isOpen: true,
    busyLevel: 'Very Busy',
    openTime: '11:00',
    closeTime: '00:00',
    menu: [
        {
            title: 'Traditional',
            items: [
                { name: 'Moukpatzi (Fish)', price: '2500 DJF', description: 'Whole spiced fish oven baked' },
                { name: 'Mandi Rice', price: '1500 DJF', description: 'Aromatic rice with lamb' }
            ]
        }
    ]
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
    features: ['Coffee', 'Historic Building', 'Patio', 'Breakfast'],
    isOpen: true,
    busyLevel: 'Quiet',
    openTime: '08:00',
    closeTime: '20:00',
    menu: [
        {
            title: 'Café & Bakery',
            items: [
                { name: 'Cappuccino', price: '800 DJF', description: 'Italian roast' },
                { name: 'Pain au Chocolat', price: '400 DJF', description: 'Freshly baked' }
            ]
        }
    ]
  },
  {
    id: 'dj_cas_3',
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
    features: ['Wood-fired Pizza', 'Takeout', 'Italian', 'Family Friendly'],
    isOpen: true,
    busyLevel: 'Moderate',
    openTime: '12:00',
    closeTime: '23:00',
    menu: [
        {
            title: 'Pizzas',
            items: [
                { name: 'Margherita', price: '1800 DJF', description: 'Tomato, mozzarella, basil' },
                { name: 'Djiboutienne', price: '2200 DJF', description: 'Spicy ground beef, onions' }
            ]
        }
    ]
  },
  {
    id: 'dj_cas_4',
    name: 'Mukbassa Central',
    type: 'Traditional',
    vibe: 'Lively',
    priceLevel: '$',
    description: 'A must-visit for the adventurous eater. Famous for its "Poisson Yemenite" cooked in a clay oven. No frills, plastic chairs, but flavor that hits hard.',
    photoUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/08/9a/bc/de/mukbassa.jpg',
    photos: [
        'https://media-cdn.tripadvisor.com/media/photo-s/08/9a/bc/de/mukbassa.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0a/11/22/33/clay-oven.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0b/44/55/66/fish.jpg'
    ],
    rating: 4.7,
    lat: 11.5915,
    lng: 43.1415,
    features: ['Yemeni Style', 'Clay Oven', 'Very Cheap', 'Late Night'],
    isOpen: true,
    busyLevel: 'Busy',
    openTime: '10:00',
    closeTime: '01:00',
    menu: [
        {
            title: 'Clay Oven',
            items: [
                { name: 'Poisson Yemenite', price: '1200 DJF', description: 'Served with huge naan bread' },
                { name: 'Fahsa', price: '1000 DJF', description: 'Sizzling beef stew' }
            ]
        }
    ]
  },
  {
    id: 'dj_cas_5',
    name: 'Kurry',
    type: 'Indian Restaurant',
    vibe: 'Spice',
    priceLevel: '$$',
    description: 'Authentic Indian cuisine in the heart of Djibouti. From butter chicken to spicy vindaloo, they offer a wide range of curries and fresh naan bread.',
    photoUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=1000&auto=format&fit=crop',
    photos: [
        'https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517244683847-745431d51edf?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.3,
    lat: 11.5960,
    lng: 43.1500,
    features: ['Curry', 'Naan', 'Vegetarian Options', 'Spicy'],
    isOpen: false,
    busyLevel: 'Quiet',
    openTime: '12:00',
    closeTime: '22:00',
    menu: [
        {
            title: 'Curries',
            items: [
                { name: 'Butter Chicken', price: '2000 DJF', description: 'Creamy tomato sauce' },
                { name: 'Lamb Rogan Josh', price: '2200 DJF', description: 'Spicy kashmiri curry' }
            ]
        }
    ]
  },
  {
    id: 'dj_cas_6',
    name: 'Janateyn',
    type: 'Somali Cuisine',
    vibe: 'Family',
    priceLevel: '$$',
    description: 'Delicious Somali dishes like goat meat (hilib ari) with rice or pasta (baasto). A great place to experience the local Somali culinary influence.',
    photoUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/1a/2b/3c/janateyn.jpg',
    photos: [
        'https://media-cdn.tripadvisor.com/media/photo-s/0f/1a/2b/3c/janateyn.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0e/4d/5e/6f/pasta.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/10/7g/8h/9i/interior.jpg'
    ],
    rating: 4.2,
    lat: 11.5870,
    lng: 43.1430,
    features: ['Somali Pasta', 'Goat Meat', 'Large Portions', 'Halal'],
    isOpen: true,
    busyLevel: 'Moderate',
    openTime: '11:00',
    closeTime: '23:00',
    menu: [
        {
            title: 'Specials',
            items: [
                { name: 'Baasto with Goat', price: '1500 DJF', description: 'Spaghetti somali style' },
                { name: 'Rice and Camel', price: '1800 DJF', description: 'Fragrant rice with camel meat' }
            ]
        }
    ]
  },

  // --- NIGHTLIFE / CLUBS ---
  {
    id: 'dj_club_1',
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
    features: ['DJ', 'Dance Floor', 'Late Night', 'Drinks'],
    isOpen: false,
    busyLevel: 'Quiet',
    openTime: '22:00',
    closeTime: '05:00',
    menu: [
        {
            title: 'Bottle Service',
            items: [
                { name: 'Grey Goose', price: '25000 DJF', description: '1L Bottle with mixers' },
                { name: 'Black Label', price: '20000 DJF', description: '1L Bottle' }
            ]
        }
    ]
  },
  {
    id: 'dj_club_2',
    name: 'Le Champignon',
    type: 'Bar & Grill',
    vibe: 'Relaxed',
    priceLevel: '$$',
    description: 'A popular spot for expats and military personnel. Offers cold beer, grilled meats, and a relaxed outdoor seating area. Great for watching sports or just hanging out.',
    photoUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/09/12/34/56/le-champignon.jpg',
    photos: [
        'https://media-cdn.tripadvisor.com/media/photo-s/09/12/34/56/le-champignon.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0a/bc/de/fg/beer.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0b/12/34/56/grill.jpg'
    ],
    rating: 4.1,
    lat: 11.5980,
    lng: 43.1520,
    features: ['Beer', 'Sports', 'Outdoor Seating', 'Grill'],
    isOpen: true,
    busyLevel: 'Moderate',
    openTime: '16:00',
    closeTime: '02:00',
    menu: [
        {
            title: 'Grill',
            items: [
                { name: 'Brochette Mix', price: '2500 DJF', description: 'Beef, Chicken, and Merguez' },
                { name: 'Cold Beer', price: '1000 DJF', description: 'Heineken or local draft' }
            ]
        }
    ]
  },
  {
    id: 'dj_club_3',
    name: 'Menelik Hotel Bar',
    type: 'Hotel Bar',
    vibe: 'Classic',
    priceLevel: '$$$',
    description: 'The bar at the Menelik Hotel is a place of history and intrigue. A classic gathering spot in the city center for a quiet drink and conversation.',
    photoUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/12345678.jpg?k=abcdef',
    photos: [
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/12345678.jpg?k=abcdef',
        'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.0,
    lat: 11.5935,
    lng: 43.1485,
    features: ['Central', 'History', 'Cocktails', 'Quiet'],
    isOpen: true,
    busyLevel: 'Quiet',
    openTime: '14:00',
    closeTime: '00:00',
    menu: [
        {
            title: 'Drinks',
            items: [
                { name: 'Gin Tonic', price: '1800 DJF', description: 'Gordon\'s Gin' },
                { name: 'Whiskey Sour', price: '2000 DJF', description: 'Classic recipe' }
            ]
        }
    ]
  }
];

export const MAP_STYLE_DARK = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';