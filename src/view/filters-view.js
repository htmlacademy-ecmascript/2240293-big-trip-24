import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate({type}, currentFilter) {
  const isChecked = type === currentFilter ? 'checked' : '';

  return `<div class="trip-filters__filter">
            <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked}>
            <label class="trip-filters__filter-label" for="filter-${type}">${type.toUpperCase()}</label>
          </div>`;
}

function createFiltersTemplate(filtersItem, currentFilter) {
  return `<form class="trip-filters" action="#" method="get">
            ${filtersItem.map((filter)=> createFilterItemTemplate(filter, currentFilter)).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class FiltersView extends AbstractView{
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor ({filters, currentFilterType, onFilterTypeChange}) {
    super();

    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    const inputElement = evt.target.control;
    this.#handleFilterTypeChange(inputElement.value);
  };
}
