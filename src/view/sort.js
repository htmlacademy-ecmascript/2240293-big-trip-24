import {createElement} from '../render.js';
const SORT__VALUE = [
  {
    value: 'day',
    text: 'Day'
  },
  {
    value: 'event',
    text: 'Event'
  },
  {
    value: 'time',
    text: 'Time'
  },
  {
    value: 'price',
    text: 'Price'
  },
  {
    value: 'offer',
    text: 'Offer'
  }
];

function createSortItemTemplate({value, text}) {
  return `<div class="trip-sort__item  trip-sort__item--${value}">
            <input id="sort-${value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${value}" ${value === 'day' ? 'checked' : false} ${value === 'event' || value === 'offer' ? 'disabled' : false}>
            <label class="trip-sort__btn" for="sort-${value}">${text}</label>
          </div>`;
}

function createSortTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${SORT__VALUE.map((e)=> createSortItemTemplate(e)).join('')}
    </form>`
  );
}

export default class Sort {
  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
