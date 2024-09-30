import { FiltersValues } from '../const';
import {isCompletedPoints, isCurrentPoints, isPlannedPoints} from '../utils/points';

const filter = {
  [FiltersValues.EVERYTHING]: (points) => points,
  [FiltersValues.PAST]: (points) => points.filter((point) => isCompletedPoints(point.dateTo)),
  [FiltersValues.PRESENT]: (points) => points.filter((point) => isCurrentPoints(point.dateFrom, point.dateTo)),
  [FiltersValues.FUTURE]: (points) => points.filter((point) => isPlannedPoints(point.dateFrom)),
};

export {filter};
