const destinationsMock = [
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

function getDestinations() {
  return destinationsMock;
}


export { getDestinations };
