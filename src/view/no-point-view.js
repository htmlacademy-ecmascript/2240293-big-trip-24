import AbstractView from '../framework/view/abstract-view.js';
import { NO_POINT_MESSAGES } from '../const.js';

function createNoPointTemplate(filterType) {
  return `
    <p class="trip-events__msg">${NO_POINT_MESSAGES[filterType.toUpperCase()]}</p>
  `;
}

export default class NoPointView extends AbstractView {
  #filterType = null;
  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
