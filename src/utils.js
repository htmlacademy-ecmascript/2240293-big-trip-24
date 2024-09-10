import dayjs from 'dayjs';

const FORMATS = {
  DATE: 'D MMM',
  TIME: 'HH:mm',
  FORM: 'DD/MM/YY HH:mm'
};

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointDate(date, format = FORMATS.DATE) {
  return date ? dayjs(date).format(format) : '';
}

function capitalizeFirstLetter(text) {
  const textFirstCapitalLetter = text.charAt(0).toUpperCase() + text.slice(1);
  return textFirstCapitalLetter;
}

function humanizePointDuration(date1, date2) {
  const startDate = dayjs(date1);
  const endDate = dayjs(date2);
  const durationMinutes = endDate.diff(startDate, 'minute');
  let duration = '';

  if (durationMinutes > 1140) {
    const days = Math.trunc(durationMinutes / 1440);
    const hours = Math.trunc((durationMinutes - (days * 1440)) / 60);
    const minute = (durationMinutes - (days * 1440)) % 60;
    duration = `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minute.toString().padStart(2, '0')}M`;
  } else {
    if(durationMinutes >= 60) {
      const hours = Math.trunc(durationMinutes / 60);
      const minute = durationMinutes % 60;
      duration = `${hours.toString().padStart(2, '0')}H ${minute.toString().padStart(2, '0')}M`;
    }else {
      duration = `${durationMinutes.toString().padStart(2, '0')}M`;
    }
  }
  return duration;
}

export {getRandomArrayElement, humanizePointDate, humanizePointDuration, capitalizeFirstLetter, FORMATS};
