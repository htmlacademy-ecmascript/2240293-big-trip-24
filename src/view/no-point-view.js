import AbstractView from '../framework/view/abstract-view.js';
import { NO_POINT_MESSAGES } from '../const.js';

function createNoPointTemplate(filterChecked) {
  return `
    <p class="trip-events__msg">${NO_POINT_MESSAGES[filterChecked.toUpperCase()]}</p>
  `;
}

export default class NoPointView extends AbstractView {
  #filterChecked = null;
  constructor(filter) {
    super();
    this.#filterChecked = filter;
  }

  get template() {
    return createNoPointTemplate(this.#filterChecked);
  }
}
