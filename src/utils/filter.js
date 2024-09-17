import { FILTERS_VALUES } from '../const';
import {isCompletedPoints, isCurrentPoints, isPlannedPoints} from '../utils/points';

const filter = {
  [FILTERS_VALUES.EVERYTHING]: (points) => points,
  [FILTERS_VALUES.PAST]: (points) => points.filter((point) => isCompletedPoints(point.dateTo)),
  [FILTERS_VALUES.PRESENT]: (points) => points.filter((point) => isCurrentPoints(point.dateFrom, point.dateTo)),
  [FILTERS_VALUES.FUTURE]: (points) => points.filter((point) => isPlannedPoints(point.dateFrom)),
};

export {filter};
