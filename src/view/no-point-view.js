import AbstractView from '../framework/view/abstract-view.js';
import { NO_POINT_MESSAGES } from '../const.js';

function createNoPointTemplate() {
  const filterChecked = document.querySelector('.trip-filters__filter-input[checked]').value.toUpperCase();
  return `
    <p class="trip-events__msg">${NO_POINT_MESSAGES[filterChecked]}</p>
  `;
}

export default class NoPointView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
