import { getRandomPoint } from '../mock/points';
import { getOffers, getDestinations } from '../const';

const POINT_COUNT = 4;

export default class PointsModel {
  allOffers = getOffers();
  allDestinations = getDestinations();
  points = Array.from({length: POINT_COUNT}, getRandomPoint);

  getTasks() {
    return this.points;
  }

  getDestinations() {
    return this.allDestinations;
  }

  getOffers() {
    return this.allOffers;
  }

}

