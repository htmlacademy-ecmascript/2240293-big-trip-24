import AbstractView from '../framework/view/abstract-view.js';
import { NoPointMessages } from '../const.js';

function createNoPointTemplate(filterType) {
  return `<p class="trip-events__msg">${NoPointMessages[filterType.toUpperCase()]}</p>`;
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
