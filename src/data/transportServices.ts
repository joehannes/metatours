import { Tour } from '../services/toursService';

export const transportServices: Tour[] = [
  {
    id: 1,
    image: 'https://cdn.pixabay.com/photo/2016/11/18/17/20/airport-1834685_1280.jpg',
    title: 'Private Transfer (Punta Cana Zone)',
    description: 'Private airport shuttle with meet-and-greet service and luggage assistance.',
    price: 'From USD 15',
    pricingOptions: [
      { tier: 'Persons', price: 'From USD 15', amount: 15 }
    ],
    details: {
      description: 'Fast and comfortable transfer from the airport or hotel with a dedicated driver and air-conditioned vehicle.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/18/17/20/airport-1834685_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/09/16/airport-1867307_1280.jpg'
      ]
    }
  },
  {
    id: 2,
    image: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/car-1868725_1280.jpg',
    title: 'Luxury SUV Transfer',
    description: 'Premium SUV service for executive arrivals and special occasions, 4-6 passengers.',
    price: 'From USD 35',
    pricingOptions: [
      { tier: 'Persons', price: 'From USD 35', amount: 35 }
    ],
    details: {
      description: 'Upgrade your arrival with a polished VIP transfer experience in a luxury SUV with tinted windows and professional driver.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/29/09/32/car-1868725_1280.jpg',
        'https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_1280.jpg'
      ]
    }
  },
  {
    id: 3,
    image: 'https://cdn.pixabay.com/photo/2016/11/29/09/16/airport-1867307_1280.jpg',
    title: 'Minivan Coach (AC)',
    description: 'Air-conditioned minivan for group transfers, city tours, and cultural excursions, 7-20 passengers.',
    price: 'From USD 25',
    pricingOptions: [
      { tier: 'Persons', price: 'From USD 25', amount: 25 }
    ],
    details: {
      description: 'Spacious air-conditioned minivan ideal for Santo Domingo city tours, airport transfers, and group cultural excursions.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/29/09/16/airport-1867307_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/18/17/20/airport-1834685_1280.jpg'
      ]
    }
  },
  {
    id: 4,
    image: 'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
    title: 'Shared Catamaran',
    description: 'Large catamaran for Saona and Catalina island trips with snorkeling, open bar, and party atmosphere, 20-40 passengers.',
    price: 'From USD 65',
    pricingOptions: [
      { tier: 'Persons', price: 'From USD 65', amount: 65 }
    ],
    details: {
      description: 'Wide catamaran with lounging nets, open bar, music, and snorkeling stops on the way to Saona or Catalina Island.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg'
      ]
    }
  },
  {
    id: 5,
    image: 'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
    title: 'Speedboat Transfer',
    description: 'Fast speedboat for private island hops, fishing charters, and quick transfers, 8-12 passengers.',
    price: 'From USD 45',
    pricingOptions: [
      { tier: 'Persons', price: 'From USD 45', amount: 45 }
    ],
    details: {
      description: 'Sleek speedboat for fast transfers to Saona, private island visits, and fishing charter departures.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/19/14/00/beach-1836467_1280.jpg'
      ]
    }
  },
  {
    id: 6,
    image: 'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
    title: 'Jet Ski Rental',
    description: 'Jet ski for coastal tours, natural pool visits, and thrill rides, 1-2 passengers per unit.',
    price: 'From USD 75',
    pricingOptions: [
      { tier: 'Persons', price: 'From USD 75', amount: 75 }
    ],
    details: {
      description: 'Ride a jet ski along the Bavaro coastline, visit natural pools, and enjoy high-speed thrills on turquoise water.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/22/19/18/boat-1850214_1280.jpg'
      ]
    }
  },
  {
    id: 7,
    image: 'https://cdn.pixabay.com/photo/2016/03/27/19/31/adventure-1286920_1280.jpg',
    title: 'Safari Truck (Open-Air)',
    description: 'Canvas-covered open-air truck for plantation tours, Monkey Land, and group excursions, 15-25 passengers.',
    price: 'From USD 20',
    pricingOptions: [
      { tier: 'Persons', price: 'From USD 20', amount: 20 }
    ],
    details: {
      description: 'Traditional open-air safari truck with bench seating for plantation tours, Monkey Land visits, and countryside excursions.',
      images: [
        'https://cdn.pixabay.com/photo/2016/03/27/19/31/adventure-1286920_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/05/45/beach-1867271_1280.jpg'
      ]
    }
  },
  {
    id: 8,
    image: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/quad-4268938_1280.jpg',
    title: 'ATV Quad Bike',
    description: 'Single-rider quad bike for solo adventure trails, Macao village, and plantation paths.',
    price: 'From USD 69',
    pricingOptions: [
      { tier: 'Persons', price: 'From USD 69', amount: 69 }
    ],
    details: {
      description: 'Helmet-equipped ATV quad bike for independent riders exploring jungle trails, village roads, and cenote routes.',
      images: [
        'https://cdn.pixabay.com/photo/2019/06/11/18/56/quad-4268938_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/03/27/19/31/adventure-1286920_1280.jpg'
      ]
    }
  },
  {
    id: 9,
    image: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/quad-4268938_1280.jpg',
    title: 'Polaris RZR Side-by-Side',
    description: 'Two or four passenger side-by-side buggy for off-road jungle trails, beach runs, and countryside exploration.',
    price: 'From USD 55',
    pricingOptions: [
      { tier: 'Persons', price: 'From USD 55', amount: 55 }
    ],
    details: {
      description: 'Polaris RZR side-by-side with roll cage and mud tires for shared off-road adventures through jungle, beach, and plantation terrain.',
      images: [
        'https://cdn.pixabay.com/photo/2019/06/11/18/56/quad-4268938_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg'
      ]
    }
  },
  {
    id: 10,
    image: 'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
    title: 'Dune Buggy (Single/Double)',
    description: 'Open-frame dune buggy for beach driving, cenote visits, and countryside exploration, 1-2 passengers.',
    price: 'From USD 55',
    pricingOptions: [
      { tier: 'Persons', price: 'From USD 55', amount: 55 }
    ],
    details: {
      description: 'Lightweight open-frame dune buggy perfect for sunset beach drives, cenote visits, and scenic countryside routes.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/05/45/beach-1867271_1280.jpg'
      ]
    }
  },
  {
    id: 11,
    image: 'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
    title: 'Horseback Riding',
    description: 'Saddled horse for beach riding experiences, ranch activities, and sunset tours, 1 rider.',
    price: 'From USD 68',
    pricingOptions: [
      { tier: 'Persons', price: 'From USD 68', amount: 68 }
    ],
    details: {
      description: 'Well-trained horses for guided beach rides at sunrise or sunset, trotting through shallow surf along the Bavaro coast.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/19/14/00/beach-1836467_1280.jpg'
      ]
    }
  },
  {
    id: 12,
    image: 'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
    title: 'Helicopter Charter',
    description: 'Scenic helicopter for aerial photography, coastal flights, and luxury transfers, 3-5 passengers.',
    price: 'From USD 199',
    pricingOptions: [
      { tier: 'Persons', price: 'From USD 199', amount: 199 }
    ],
    details: {
      description: 'Private helicopter charter for scenic coastal flights over Cap Cana marina, Bavaro beaches, and aerial photography sessions.',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/21/15/46/beach-1846035_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/11/19/14/00/beach-1836467_1280.jpg'
      ]
    }
  }
];