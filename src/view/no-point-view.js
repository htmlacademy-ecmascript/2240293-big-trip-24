import AbstractView from '../framework/view/abstract-view.js';
import { NO_POINT_MESSAGES } from '../const.js';

function createNoPointTemplate(filterChecked) {
  return `
    <p class="trip-events__msg">${NO_POINT_MESSAGES[filterChecked]}</p>
  `;
}

export default class NoPointView extends AbstractView {
  #filterChecked = null;
  constructor() {
    super();
    this.#filterChecked = document.querySelector('.trip-filters__filter-input[checked]').value.toUpperCase();
  }

  get template() {
    return createNoPointTemplate(this.#filterChecked);
  }
}
