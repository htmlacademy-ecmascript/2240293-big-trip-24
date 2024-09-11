import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate({type}) {
  return `<div class="trip-filters__filter">
        <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === 'everything' ? 'checked' : false}>
        <label class="trip-filters__filter-label" for="filter-${type}">${type.toUpperCase()}</label>
      </div>`;
}

function createFiltersTemplate(filtersItem) {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersItem.map((e)=> createFilterItemTemplate(e)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FiltersView extends AbstractView{
  #filters = null;

  constructor ({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
