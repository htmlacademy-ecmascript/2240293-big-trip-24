const FILTER__VALUE = ['everything', 'future', 'present', 'past'];

const SORT__VALUE = ['day', 'event', 'time', 'price', 'offer'];

const TYPES_ITEM = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const OFFERS = [
  {
    id: 'luggage',
    value: 'luggage',
    title: 'Add luggage',
    prise: '30'
  },
  {
    id: 'comfort',
    value: 'comfort',
    title: 'Switch to comfort class',
    prise: '100'
  },
  {
    id: 'meal',
    value: 'meal',
    title: 'Add meal',
    prise: '15'
  },
  {
    id: 'seats',
    value: 'seats',
    title: 'Choose seats',
    prise: '5'
  },
  {
    id: 'train',
    value: 'train',
    title: 'Travel by train',
    prise: '40'
  },
  {
    id: 'Uber',
    value: 'uber',
    title: 'Order Uber',
    prise: '20'
  },
  {
    id: 'rent',
    value: 'rent',
    title: 'Rent a car',
    prise: '200'
  },
  {
    id: 'breakfast',
    value: 'breakfast',
    title: 'Add breakfast',
    prise: '50'
  },
  {
    id: 'tickets',
    value: 'tickets',
    title: 'Book tickets',
    prise: '40'
  },
  {
    id: 'lunch',
    value: 'lunch',
    title: 'Lunch in city',
    prise: '30'
  }
];

const DESTINATIONS = [
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    description: '',
    picture: []
  },
  {
    id: 'geneva',
    name: 'Geneva',
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    picture: [
      {
        src: 'img/photos/1.jpg',
        description: 'Event photo'
      },
      {
        src: 'img/photos/2.jpg',
        description: 'Event photo'
      },
      {
        src: 'img/photos/3.jpg',
        description: 'Event photo'
      },
      {
        src: 'img/photos/4.jpg',
        description: 'Event photo'
      },
      {
        src: 'img/photos/5.jpg',
        description: 'Event photo'
      }
    ]
  },
  {
    id: 'chamonix',
    name: 'Chamonix',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    picture: [
      {
        src: 'https://loremflickr.com/248/152?random=15',
        description: 'Event photo'
      },
      {
        src: 'https://loremflickr.com/248/152?random=1554',
        description: 'Event photo'
      },
      {
        src: 'https://loremflickr.com/248/152?random=557',
        description: 'Event photo'
      },
      {
        src: 'https://loremflickr.com/248/152?random=954',
        description: 'Event photo'
      },
      {
        src: 'img/photos/5.jpg',
        description: 'Event photo'
      }
    ]
  }
];

export {FILTER__VALUE, SORT__VALUE, TYPES_ITEM, DESTINATIONS, OFFERS};
