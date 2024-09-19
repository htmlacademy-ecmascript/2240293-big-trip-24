import AbstractView from '../framework/view/abstract-view.js';
import { SORT_VALUES } from '../const.js';
import { capitalizeFirstLetter } from '../utils/common.js';

function createSortItemTemplate(item) {
  return `<div class="trip-sort__item  trip-sort__item--${item}">
            <input id="sort-${item}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item}" ${item === 'day' ? 'checked' : false} ${item === 'event' || item === 'offer' ? 'disabled' : false}>
            <label class="trip-sort__btn" for="sort-${item}" data-sort-type="${item}">${capitalizeFirstLetter(item)}</label>
          </div>`;
}

function createSortTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${SORT_VALUES.map((e)=> createSortItemTemplate(e)).join('')}
    </form>`
  );
}

export default class SortView extends AbstractView{
  #handleSortTypeChange = null;
  constructor({onSortTypeChange}) {
    super();
    this. #handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    //перестал ывизуально переключаться input, не нашла почему, пока сделала так
    const inputs = this.element.querySelectorAll('input');
    const inputChecked = this.element.querySelector(`.trip-sort__item--${evt.target.dataset.sortType}`).querySelector('input');
    if (!inputChecked.hasAttribute('disabled')) {
      inputs.forEach((el) => el.removeAttribute('checked'));
      inputChecked.setAttribute('checked', '');
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
