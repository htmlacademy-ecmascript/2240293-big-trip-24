import AbstractView from '../framework/view/abstract-view.js';
import { FORMATS, humanizePointDate } from '../utils/points.js';
import { capitalizeFirstLetter } from '../utils/common.js';

const BLANK_POINT = {
  type: 'flight',
  destination: '',
  dateFrom: '',
  dateTo: '',
  basePrice: '0',
  offers: ['luggage', 'comfort', 'meal', 'seats', 'train'],
};

function createTypeItemTemplate(type) {
  return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
    </div>`;
}

function createDetailsTemplate(type, offers, destinationDefault, allOffers, edit) {
  const details = [];

  if (offers) {
    const offerDefault = allOffers.find((item) => item.type === type);
    details.push(`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offerDefault.offers.map((e) => {
    const offer = offers.find((item) => item === e.id);
    return (`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e.value}-1" type="checkbox" name="event-offer-${e.value}" ${offer && edit ? 'checked' : false}>
          <label class="event__offer-label" for="event-offer-${e.value}-1">
            <span class="event__offer-title">${e.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-basePrice">${e.price}</span>
          </label>
        </div>`);
  }).join('')}
      </div>
    </section>`);
  }

  if (destinationDefault && (destinationDefault.picture.length > 0 || destinationDefault.description.trim() > 0)) {
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
  return details.join('');
}


function createEventTemplate(point, allOffers, allDestinations, edit) {
  const {type, destination, dateFrom, dateTo, basePrice, offers} = point;

  const destinationDefault = allDestinations.find((item) => item.id === destination);
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
                ${allOffers.map((e) => createTypeItemTemplate(e.type)).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationDefault ? `${destinationDefault.name}` : ''}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${allDestinations.map((e) => `<option value="${e.name}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointDate(dateFrom, FORMATS.FORM)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointDate(dateTo, FORMATS.FORM)}">
          </div>

          <div class="event__field-group  event__field-group--basePrice">
            <label class="event__label" for="event-basePrice-1">
              <span class="visually-hidden">basePrice</span>
              &euro;
            </label>
            <input class="event__input  event__input--basePrice" id="event-basePrice-1" type="text" name="event-basePrice" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${edit ? 'Delete' : 'Cancel'}</button>
        </header>
        <section class="event__details">
          ${createDetailsTemplate(type, offers, destinationDefault, allOffers, edit)}
        </section>
      </form>
    </li>`;
}


export default class FormPointView extends AbstractView{
  #handleFormSubmit = null;
  #point = null;

  constructor({point = BLANK_POINT, allOffers, allDestinations, edit, onFormSubmit}) {
    super();
    this.#point = point;
    this.allOffers = allOffers;
    this.allDestinations = allDestinations;
    this.isEdit = edit;
    this.#handleFormSubmit = onFormSubmit;
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
  }


  get template() {
    return createEventTemplate(this.#point, this.allOffers, this.allDestinations, this.isEdit);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };
}
