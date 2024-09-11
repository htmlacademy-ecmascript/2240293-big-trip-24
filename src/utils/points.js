import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const FORMATS = {
  DATE: 'D MMM',
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

  if (pointDuration.days() > 0) {
    return `${pointDuration.format('DD[D] HH[H] mm[M]')}`;
  }
  if (pointDuration.hours() > 0) {
    return `${pointDuration.format('HH[H] mm[M]')}`;
  }else {
    return `${pointDuration.format('mm[M]')}`;
  }
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


export {humanizePointDate, humanizePointDuration, FORMATS, isCompletedPoints, isCurrentPoints, isPlannedPoints};
