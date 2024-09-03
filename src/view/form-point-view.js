import {createElement} from '../render.js';
import { DESTINATIONS, TYPES_ITEM } from '../const.js';
import { OFFERS } from '../const.js';
import { capitalizeFirstLetter, FORMATS, humanizePointDate } from '../utils.js';

const BLANK_POINT = {
  type: 'flight',
  destination: '',
  startDate: '',
  endDate: '',
  price: '0',
  offers: ['luggage', 'comfort', 'meal', 'seats', 'train'],
};

function createTypeItemTemplate(type) {
  return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
    </div>`;
}

function createDetailsTemplate(offers, destination) {
  const details = [];
  if (offers) {
    details.push(`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers.map((e) => {
    const offer = OFFERS.find((item) => item.id === e);
    return (`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.value}-1" type="checkbox" name="event-offer-${offer.value}">
          <label class="event__offer-label" for="event-offer-${offer.value}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.prise}</span>
          </label>
        </div>`);
  }).join('')}
      </div>
    </section>`);
  }

  if (destination) {
    const destinationDefault = DESTINATIONS.find((item) => item.id === destination);
    details.push (`
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${destinationDefault.description.trim() === 0 ? '' : `<p class="event__destination-description">${destinationDefault.description}</p>`}
        ${destinationDefault.picture.length > 0 ?
    `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${destinationDefault.picture.map((e)=> `<img class="event__photo" src="${e.src}" alt="${e.description}">`).join('')}
            </div>
          </dev>` : ''}
      </section>`);
  }
  return details;
}


function createEventTemplate(point, edit) {
  const {type, destination, startDate, endDate, price, offers} = point;
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${TYPES_ITEM.map((e)=> createTypeItemTemplate(e)).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
            <datalist id="destination-list-1">
              ${DESTINATIONS.map((e)=> `<option value="${e.name}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointDate(startDate, FORMATS.FORM)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointDate(endDate, FORMATS.FORM)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${edit ? 'Delete' : 'Cancel'}</button>
        </header>
        <section class="event__details">
          ${createDetailsTemplate(offers, destination).join('')}
        </section>
      </form>
    </li>`;
}


export default class FormPointView {
  constructor({point = BLANK_POINT}) {
    this.point = point;
  }

  getTemplate() {
    return createEventTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
  // форма редактирования

  // editElement() {
  //   this.element = createElement(this.getTemplate(this.point, true));
  //   return this.element;
  // }

  removeElement() {
    this.element = null;
  }
}
