import {filter} from '../utils/filter.js';

function generateFilter(pointsitem) {
  return Object.entries(filter).map(
    ([filterType, points]) => ({
      type: filterType,
      points: points(pointsitem)
    }),
  );
}

export {generateFilter};
