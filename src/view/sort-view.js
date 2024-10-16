import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';
import { capitalizeFirstLetter } from '../utils/common.js';

function createSortItemTemplate(item, sortType) {
  const isChecked = (item === sortType ? 'checked' : '');
  const isDisabled = (item === 'event' || item === 'offer' ? 'disabled' : '');

  return `
    <div class="trip-sort__item  trip-sort__item--${item}">
      <input id="sort-${item}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item}" ${isChecked} ${isDisabled} data-sort-type="${item}">
      <label class="trip-sort__btn" for="sort-${item}" >${capitalizeFirstLetter(item)}</label>
    </div>`;
}

function createSortTemplate(sortType) {
  const sortValues = Object.values(SortType);

  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortValues.map((item)=> createSortItemTemplate(item, sortType)).join('')}
    </form>`;
}

export default class SortView extends AbstractView{
  #handleSortTypeChange = null;
  #sortType = null;

  constructor({onSortTypeChange, sortType}) {
    super();

    this.#sortType = sortType;
    this. #handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#sortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.classList.contains('trip-sort__input')) {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
