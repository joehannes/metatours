import { Tour } from '../services/toursService';

export const tours: Tour[] = [
  {
    id: 1,
    image: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/beach-1836467_1280.jpg',
    title: 'Saona Island Paradise Found',
    description: 'Discover the stunning beauty of Saona Island with a relaxing day of sun and sand.',
    price: '$85',
    pricingOptions: [
      { tier: 'Persons', price: '$85', amount: 85 }
    ],
    details: {
      description: 'Spend the day on white-sand beaches with boat transfers, a natural pool stop, and island time under the palms.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/19/14/00/beach-1836467_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/05/45/beach-1867271_1280.jpg'
      ]
    }
  },
  {
    id: 2,
    image: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/quad-4268938_1280.jpg',
    title: 'ATV Runners Adventure',
    description: 'Single-rider ATV tour through Macao village, jungle trails, and cenote swim stop.',
    price: '$69',
    pricingOptions: [
      { tier: 'Persons', price: '$69', amount: 69 }
    ],
    details: {
      description: 'Drive muddy backroads, visit a hidden cenote, and cool off after a high-energy ATV route through countryside and plantation paths.',
      images: [
        'https://cdn.pixabay.com/photo/2019/06/11/18/56/quad-4268938_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/03/27/19/31/adventure-1286920_1280.jpg'
      ]
    }
  },
  {
    id: 3,
    image: 'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
    title: 'Ultimate ATV & Buggy Combo',
    description: 'Polaris RZR side-by-side buggy for two through countryside, beach, and coffee plantation.',
    price: '$55',
    pricingOptions: [
      { tier: 'Persons', price: '$55', amount: 55 }
    ],
    details: {
      description: 'Share the ride in a Polaris RZR side-by-side through scenic backroads, beach stretches, and local plantations.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg'
      ]
    }
  },
  {
    id: 4,
    image: 'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
    title: 'Dune Buggy + Catamaran Full Day',
    description: 'Morning dune buggy off-road followed by afternoon catamaran sail with snorkeling.',
    price: '$115',
    pricingOptions: [
      { tier: 'Persons', price: '$115', amount: 115 }
    ],
    details: {
      description: 'Full-day combo: morning off-road adventure through jungle trails, then afternoon catamaran cruise with snorkeling at a natural reef.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
        'https://cdn.pixabay.com/photo/2019/06/11/18/56/quad-4268938_1280.jpg'
      ]
    }
  },
  {
    id: 5,
    image: 'https://cdn.pixabay.com/photo/2016/11/29/05/45/beach-1867271_1280.jpg',
    title: 'Sunset Buggy with Cave Swim',
    description: 'Evening buggy ride to natural cave pool for twilight swim.',
    price: '$85',
    pricingOptions: [
      { tier: 'Persons', price: '$85', amount: 85 }
    ],
    details: {
      description: 'Golden hour buggy adventure ending with a refreshing swim in a natural limestone cave pool as the sun sets.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/29/05/45/beach-1867271_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg'
      ]
    }
  },
  {
    id: 6,
    image: 'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
    title: 'Horseback Riding on the Beach',
    description: 'Guided horseback ride along Bavaro beach at sunrise or sunset.',
    price: '$68',
    pricingOptions: [
      { tier: 'Persons', price: '$68', amount: 68 }
    ],
    details: {
      description: 'Trot through shallow surf and soft sand on a guided horseback experience along the pristine Bavaro coastline.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/19/14/00/beach-1836467_1280.jpg'
      ]
    }
  },
  {
    id: 7,
    image: 'https://cdn.pixabay.com/photo/2016/03/27/19/31/adventure-1286920_1280.jpg',
    title: 'Zipline & Cenote Ranch Adventure',
    description: '8-cable zipline course through jungle canopy, cenote cliff jump, ranch lunch.',
    price: '$119',
    pricingOptions: [
      { tier: 'Persons', price: '$119', amount: 119 }
    ],
    details: {
      description: 'Soar through the jungle canopy on eight zipline cables, leap into a cenote, and enjoy a traditional ranch lunch.',
      images: [
        'https://cdn.pixabay.com/photo/2016/03/27/19/31/adventure-1286920_1280.jpg',
        'https://cdn.pixabay.com/photo/2019/06/11/18/56/quad-4268938_1280.jpg'
      ]
    }
  },
  {
    id: 8,
    image: 'https://cdn.pixabay.com/photo/2016/11/29/09/16/airport-1867307_1280.jpg',
    title: 'Santo Domingo Cultural Tour',
    description: 'Full-day guided tour of UNESCO colonial city with local lunch.',
    price: '$89',
    pricingOptions: [
      { tier: 'Persons', price: '$89', amount: 89 }
    ],
    details: {
      description: 'Explore the first European city in the Americas, walk cobblestone streets, visit historic landmarks, and enjoy authentic Dominican cuisine.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/29/09/16/airport-1867307_1280.jpg',
        'https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_1280.jpg'
      ]
    }
  },
  {
    id: 9,
    image: 'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
    title: 'Deep Sea Fishing Charter',
    description: 'Private or shared sport fishing boat targeting marlin, mahi-mahi, tuna.',
    price: '$125',
    pricingOptions: [
      { tier: 'Persons', price: '$125', amount: 125 }
    ],
    details: {
      description: 'Head out on open ocean waters for a half-day or full-day sport fishing charter targeting big game fish.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg'
      ]
    }
  },
  {
    id: 10,
    image: 'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
    title: 'Scuba Diving Two-Tank',
    description: 'Certified diver reef exploration at Catalina or Saona wall.',
    price: '$95',
    pricingOptions: [
      { tier: 'Persons', price: '$95', amount: 95 }
    ],
    details: {
      description: 'Two-tank scuba dive exploring vibrant coral reefs and underwater walls at Catalina Island or Saona.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/19/14/00/beach-1836467_1280.jpg'
      ]
    }
  },
  {
    id: 11,
    image: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/beach-1836467_1280.jpg',
    title: 'Hoyo Azul Cenote at Scape Park',
    description: 'Visit famous blue hole cenote inside Scape Park with cliff jumping.',
    price: '$79',
    pricingOptions: [
      { tier: 'Persons', price: '$79', amount: 79 }
    ],
    details: {
      description: 'Swim in the legendary turquoise-blue cenote nestled at the base of towering limestone cliffs inside Scape Park.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/19/14/00/beach-1836467_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/05/45/beach-1867271_1280.jpg'
      ]
    }
  },
  {
    id: 12,
    image: 'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
    title: 'Jet Ski Coastal Tour',
    description: 'Guided jet ski ride along Bavaro coastline with snorkeling stop.',
    price: '$75',
    pricingOptions: [
      { tier: 'Persons', price: '$75', amount: 75 }
    ],
    details: {
      description: 'Ride a jet ski along the Bavaro coast, stopping at a natural pool for snorkeling in crystal-clear water.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg'
      ]
    }
  },
  {
    id: 13,
    image: 'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
    title: 'Parasailing Over Bavaro',
    description: 'Tandem parasailing flight 300ft above Bavaro beach panoramic views.',
    price: '$55',
    pricingOptions: [
      { tier: 'Persons', price: '$55', amount: 55 }
    ],
    details: {
      description: 'Soar 300 feet above the turquoise Caribbean for breathtaking panoramic views of Bavaro beach and coastline.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/19/14/00/beach-1836467_1280.jpg'
      ]
    }
  },
  {
    id: 14,
    image: 'https://cdn.pixabay.com/photo/2016/11/29/05/45/beach-1867271_1280.jpg',
    title: 'Monkey Land Safari & Plantation',
    description: 'Interactive monkey sanctuary visit, sugarcane plantation tour, rum tasting.',
    price: '$65',
    pricingOptions: [
      { tier: 'Persons', price: '$65', amount: 65 }
    ],
    details: {
      description: 'Meet squirrel monkeys up close, tour a working sugarcane plantation, and sample local rum and chocolate.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/29/05/45/beach-1867271_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/03/27/19/31/adventure-1286920_1280.jpg'
      ]
    }
  },
  {
    id: 15,
    image: 'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
    title: 'Private Catamaran Charter',
    description: 'Exclusive private catamaran for up to 15 guests, custom itinerary.',
    price: '$695',
    pricingOptions: [
      { tier: 'Persons', price: '$695', amount: 695 }
    ],
    details: {
      description: 'Charter your own spacious catamaran for up to 15 guests with a personalized itinerary, open bar, and dedicated crew.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg'
      ]
    }
  },
  {
    id: 16,
    image: 'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
    title: 'Helicopter Coastal Flight',
    description: 'Scenic helicopter tour over Cap Cana marina and Bavaro beaches.',
    price: '$199',
    pricingOptions: [
      { tier: 'Persons', price: '$199', amount: 199 }
    ],
    details: {
      description: 'A breathtaking 30-minute aerial tour over turquoise waters, Cap Cana marina, and the endless stretch of Bavaro beaches.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/19/14/00/beach-1836467_1280.jpg'
      ]
    }
  },
  {
    id: 17,
    image: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/beach-1836467_1280.jpg',
    title: 'Saona Island Exclusive Lobster Feast',
    description: 'Premium Saona experience with lobster lunch and VIP beach area.',
    price: '$125',
    pricingOptions: [
      { tier: 'Persons', price: '$125', amount: 125 }
    ],
    details: {
      description: 'An upgraded Saona Island trip featuring a fresh lobster feast, exclusive beach section, and premium service.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/19/14/00/beach-1836467_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/05/45/beach-1867271_1280.jpg'
      ]
    }
  },
  {
    id: 18,
    image: 'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
    title: 'Party Boat Experience',
    description: 'Join us for a fun-filled day on the water with music, drinks, and great company.',
    price: '$65',
    pricingOptions: [
      { tier: 'Persons', price: '$65', amount: 65 }
    ],
    details: {
      description: 'Cruise along the Caribbean coast with music, snorkeling, and a festive natural pool stop.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg'
      ]
    }
  }
];