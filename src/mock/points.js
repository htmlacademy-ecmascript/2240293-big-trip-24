import { getRandomArrayElement } from '../utils/common';
import { getDestinations } from '../const.js';

const mockPoints = [
  {
    type: 'taxi',
    destination: `${getRandomArrayElement(getDestinations()).id}`,
    dateFrom: '2019-03-18T10:30',
    dateTo: '2019-03-18T11:00',
    basePrice: '130',
    offers: ['uber'],
    isFavorite: true,
  },
  {
    type: 'flight',
    destination: `${getRandomArrayElement(getDestinations()).id}`,
    dateFrom: '2019-03-18T14:30',
    dateTo: '2019-03-18T16:05',
    basePrice: '30',
    offers: ['luggage', 'comfort'],
    isFavorite: false,
  },
  {
    type: 'check-in',
    destination: `${getRandomArrayElement(getDestinations()).id}`,
    dateFrom: '2019-03-20T08:25',
    dateTo: '2019-03-20T09:25',
    basePrice: '40',
    offers: [],
    isFavorite: false,
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
