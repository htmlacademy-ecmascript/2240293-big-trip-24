import { FILTERS__VALUE } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(value) {
  return `<div class="trip-filters__filter">
        <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}" ${value === 'everything' ? 'checked' : false}>
        <label class="trip-filters__filter-label" for="filter-${value}">${value}</label>
      </div>`;
}

function createFiltersTemplate() {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${FILTERS__VALUE.map((e)=> createFilterItemTemplate(e)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FiltersView extends AbstractView{
  get template() {
    return createFiltersTemplate();
  }
}
