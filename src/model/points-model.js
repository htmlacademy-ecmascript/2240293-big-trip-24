import { getRandomPoint } from '../mock/points';
import { getOffers, getDestinations } from '../const';

const POINT_COUNT = 4;

export default class PointsModel {
  #allOffers = getOffers();
  #allDestinations = getDestinations();
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#allDestinations;
  }

  get offers() {
    return this.#allOffers;
  }

}

