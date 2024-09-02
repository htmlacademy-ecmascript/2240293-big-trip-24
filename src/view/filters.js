import {createElement} from '../render.js';
const FILTER__VALUE = ['everything', 'future', 'present', 'past'];

function createFilterItemTemplate(value) {
  return `<div class="trip-filters__filter">
        <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}" ${value === 'everything' ? 'checked' : false}>
        <label class="trip-filters__filter-label" for="filter-${value}">${value}</label>
      </div>`;
}

function createFiltersTemplate() {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${FILTER__VALUE.map((e)=> createFilterItemTemplate(e)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class Filters {
  getTemplate() {
    return createFiltersTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
