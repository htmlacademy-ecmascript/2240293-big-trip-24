import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const FORMATS = {
  DATE: 'MMM D',
  DATE_TRIP_INFO: 'D MMM',
  TIME: 'HH:mm',
  FORM: 'DD/MM/YY HH:mm'
};

function humanizePointDate(date, format = FORMATS.DATE) {
  return date ? dayjs(date).format(format) : '';
}

function humanizePointDuration(date1, date2) {
  const startDate = dayjs(date1);
  const endDate = dayjs(date2);
  const pointDuration = dayjs.duration(endDate.diff(startDate));

  if (pointDuration.months() > 0 || pointDuration.years() > 0) {
    const days = Math.floor(pointDuration.asDays());
    return `${pointDuration.format(`${days}[D] HH[H] mm[M]`)}`;
  }
  if (pointDuration.days() > 0) {
    return `${pointDuration.format('DD[D] HH[H] mm[M]')}`;
  }
  if (pointDuration.hours() > 0) {
    return `${pointDuration.format('HH[H] mm[M]')}`;
  }
  return `${pointDuration.format('mm[M]')}`;
}

function isCompletedPoints(dateTo) {
  return dateTo && dayjs().isAfter(dayjs(dateTo));
}

function isCurrentPoints(dateFrom, dateTo) {
  return dayjs().isSameOrAfter(dayjs(dateFrom)) && dayjs().isSameOrBefore(dayjs(dateTo));
}

function isPlannedPoints(dateFrom) {
  return dateFrom && dayjs().isBefore(dayjs(dateFrom));
}

function getWeightForNullDate(pointA, pointB) {
  if (pointA === null && pointB === null) {
    return 0;
  }

  if (pointA === null) {
    return 1;
  }

  if (pointB === null) {
    return -1;
  }

  return null;
}

function compareParametersPoints(pointA, pointB) {
  if (pointA < pointB) {
    return 1;
  }
  if (pointA > pointB) {
    return -1;
  }
  return 0;
}

function sortPointDate(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointPrice(pointA, pointB) {
  return compareParametersPoints(Number(pointA.basePrice), Number(pointB.basePrice));
}

function sortPointTime(pointA, pointB) {
  const pointADuration = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDuration = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return compareParametersPoints(pointADuration, pointBDuration);
}

function toggleOffers(offers, id) {
  if (offers.includes(id)) {
    return offers.filter((offer) => offer !== id);
  }
  return [...offers, id];
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

export {humanizePointDate, humanizePointDuration, FORMATS, isCompletedPoints, isCurrentPoints, isPlannedPoints, sortPointDate, sortPointPrice, sortPointTime, toggleOffers, isDatesEqual};
