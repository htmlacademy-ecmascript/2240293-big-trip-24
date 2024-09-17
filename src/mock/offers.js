const offersMock = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'uber',
        value: 'uber',
        title: 'Order Uber',
        price: '20'
      }
    ]
  },
  {
    type: 'bus',
    offers: []
  },
  {
    type: 'train',
    offers: [
      {
        id: 'train',
        value: 'train',
        title: 'Travel by train',
        price: '40'
      }
    ]
  },
  {
    type: 'ship',
    offers: []
  },
  {
    type: 'drive',
    offers: [
      {
        id: 'rent',
        value: 'rent',
        title: 'Rent a car',
        price: '200'
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'luggage',
        value: 'luggage',
        title: 'Add luggage',
        price: '30'
      },
      {
        id: 'comfort',
        value: 'comfort',
        title: 'Switch to comfort class',
        price: '100'
      },
      {
        id: 'meal',
        value: 'meal',
        title: 'Add meal',
        price: '15'
      },
      {
        id: 'seats',
        value: 'seats',
        title: 'Choose seats',
        price: '5'
      },
      {
        id: 'train',
        value: 'train',
        title: 'Travel by train',
        price: '40'
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'breakfast',
        value: 'breakfast',
        title: 'Add breakfast',
        price: '50'
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'tickets',
        value: 'tickets',
        title: 'Book tickets',
        price: '40'
      },

    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'lunch',
        value: 'lunch',
        title: 'Lunch in city',
        price: '30'
      }
    ]
  },
];


function getOffers() {
  return offersMock;
}

export {getOffers};
