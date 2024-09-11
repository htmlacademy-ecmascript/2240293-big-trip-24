import { FILTERS__VALUE } from '../const';
import {isCompletedPoints, isCurrentPoints, isPlannedPoints} from '../utils/points';

const filter = {
  [FILTERS__VALUE.EVERYTHING]: (points) => points,
  [FILTERS__VALUE.PAST]: (points) => points.filter((point) => isCompletedPoints(point.dateTo)),
  [FILTERS__VALUE.PRESENT]: (points) => points.filter((point) => isCurrentPoints(point.dateFrom, point.dateTo)),
  [FILTERS__VALUE.FUTURE]: (points) => points.filter((point) => isPlannedPoints(point.dateFrom)),
};

export {filter};
