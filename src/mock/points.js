import { getRandomArrayElement } from '../utils/common';
import { getDestinations } from '../mock/destinations';

const mockPoints = [
  {
    type: 'taxi',
    destination: `${getRandomArrayElement(getDestinations()).id}`,
    dateFrom: '2024-09-01T10:30',
    dateTo: '2024-09-18T11:00',
    basePrice: '130',
    offers: ['uber'],
    isFavorite: true,
  },
  {
    type: 'flight',
    destination: `${getRandomArrayElement(getDestinations()).id}`,
    dateFrom: '2024-10-18T14:30',
    dateTo: '2024-10-18T16:05',
    basePrice: '30',
    offers: ['luggage', 'comfort'],
    isFavorite: false,
  },
  {
    type: 'check-in',
    destination: `${getRandomArrayElement(getDestinations()).id}`,
    dateFrom: '2024-03-20T08:25',
    dateTo: '2024-03-20T08:55',
    basePrice: '40',
    offers: [],
    isFavorite: false,
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
