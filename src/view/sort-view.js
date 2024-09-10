import {createElement} from '../render.js';
import { SORT__VALUE } from '../const.js';
import { capitalizeFirstLetter } from '../utils.js';

function createSortItemTemplate(item) {
  return `<div class="trip-sort__item  trip-sort__item--${item}">
            <input id="sort-${item}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item}" ${item === 'day' ? 'checked' : false} ${item === 'event' || item === 'offer' ? 'disabled' : false}>
            <label class="trip-sort__btn" for="sort-${item}">${capitalizeFirstLetter(item)}</label>
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
