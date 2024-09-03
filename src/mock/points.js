import {getRandomArrayElement} from '../utils.js';
import { TYPES_ITEM, DESTINATIONS } from '../const.js';

const mockPoints = [
  {
    type: getRandomArrayElement(TYPES_ITEM),
    destination: getRandomArrayElement(DESTINATIONS).id,
    startDate: '2019-03-18T10:30',
    endDate: '2019-03-18T11:00',
    price: '130',
    offers: ['luggage', 'meal'],
    isFavorite: true,
  },
  {
    type: getRandomArrayElement(TYPES_ITEM),
    destination: getRandomArrayElement(DESTINATIONS).id,
    startDate: '2019-03-18T14:30',
    endDate: '2019-03-18T16:05',
    price: '30',
    offers: ['luggage'],
    isFavorite: false,
  },
  {
    type: getRandomArrayElement(TYPES_ITEM),
    destination: getRandomArrayElement(DESTINATIONS).id,
    startDate: '2019-03-20T08:25',
    endDate: '2019-03-20T09:25',
    price: '40',
    offers: ['train'],
    isFavorite: false,
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
