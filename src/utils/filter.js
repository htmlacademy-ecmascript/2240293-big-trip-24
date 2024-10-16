import { FiltersValues } from '../const';
import { isCompletedPoints, isCurrentPoints, isPlannedPoints } from '../utils/points';

const Filter = {
  [FiltersValues.EVERYTHING]: (points) => points,
  [FiltersValues.FUTURE]: (points) => points.filter((point) => isPlannedPoints(point.dateFrom)),
  [FiltersValues.PRESENT]: (points) => points.filter((point) => isCurrentPoints(point.dateFrom, point.dateTo)),
  [FiltersValues.PAST]: (points) => points.filter((point) => isCompletedPoints(point.dateTo)),
};

export {Filter};
