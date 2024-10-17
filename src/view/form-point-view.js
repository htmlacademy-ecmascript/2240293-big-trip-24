import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import he from 'he';
import flatpickr from 'flatpickr';
import { Formats, humanizePointDate, toggleOffers } from '../utils/points.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  type: 'flight',
  destination: '',
  dateFrom: '',
  dateTo: '',
  basePrice: '0',
  offers: [],
  isFavorite: false,
};

function createTypeItemTemplate(type) {
  return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
    </div>`;
}

function createOffersTemplate(offersByTypePoint, offersPoint) {
  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersByTypePoint?.map((offer) => {
    const checkedOfferPoint = offersPoint.find((offerPointId) => offerPointId === offer.id);
    const isChecked = checkedOfferPoint ? 'checked' : '';

    return (`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.value}-1" type="checkbox" name="event-offer-${offer.value}" ${isChecked}>
          <label class="event__offer-label" for="event-offer-${offer.value}-1" data-id="${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-basePrice">${offer.price}</span>
          </label>
        </div>`);
  }).join('') || ''}
      </div>
    </section>`;
}

function createDestinationTemplate(destinationPoint) {
  return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${destinationPoint.description !== '' ? `<p class="event__destination-description">${destinationPoint.description}</p>` : ''}
        ${destinationPoint.pictures?.length > 0 ?
    `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${destinationPoint.pictures.map((e)=> `<img class="event__photo" src="${e.src}" alt="${e.description}">`).join('')}
            </div>
          </dev>` : ''}
      </section>`;
}

function createDetailsTemplate(type, offersPoint, destinationPoint, allOffers) {
  const details = [];
  const offersByTypePoint = allOffers.find((offer) => offer.type === type)?.offers;

  if (offersByTypePoint.length > 0) {
    details.push(createOffersTemplate(offersByTypePoint, offersPoint));
  }
  if (destinationPoint !== '' && (destinationPoint.pictures.length > 0 || destinationPoint.description !== '')) {
    details.push(createDestinationTemplate(destinationPoint));
  }
  return details.join('');
}

function createEventTemplate(point, allOffers, allDestinations, edit) {
  const {type, destination, dateFrom, dateTo, basePrice, offers, isSaving, isDeleting} = point;
  const destinationPoint = destination !== '' ? allDestinations.find((item) => item.id === destination) : '' ;
  const textButtonReset = isDeleting ? 'deleting...' : 'delete';

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

            <input class="event__input  event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${he.encode(destinationPoint ? `${destinationPoint.name}` : '')}"
            list="destination-list-1"
            required>
            <datalist id="destination-list-1">
              ${allDestinations.map((e) => `<option value="${e.name}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>

            <input class="event__input  event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${humanizePointDate(dateFrom, Formats.FORM)}"
            required>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>

            <input class="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${humanizePointDate(dateTo, Formats.FORM)}"
            required>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-basePrice-1">
              <span class="visually-hidden">basePrice</span>
              &euro;
            </label>

            <input class="event__input  event__input--price"
            id="event-basePrice-1"
            type="number"
            name="event-basePrice"
            value="${basePrice}"
            min="1"
            max="100000"
            onkeyup="this.value = this.value.replace(/[^0-9]/g,'');"
            required>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset">${edit ? textButtonReset : 'Cancel'}</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${createDetailsTemplate(type, offers, destinationPoint, allOffers)}
        </section>
      </form>
    </li>`;
}

export default class FormPointView extends AbstractStatefulView{
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleRollupClick = null;
  #startDatepicker = null;
  #endDatepicker = null;

  constructor({point = BLANK_POINT, allOffers, allDestinations, onFormSubmit, onDeleteClick, onRollupClick}) {
    super();

    this._setState(FormPointView.parsePointToState(point));
    this.allOffers = allOffers;
    this.allDestinations = allDestinations;
    this.isEdit = !!point.id;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleRollupClick = onRollupClick;

    this._restoreHandlers();
  }

  get template() {
    return createEventTemplate(this._state, this.allOffers, this.allDestinations, this.isEdit);
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('click', this.#pointOfferClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#pointTypeClickHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#pointDestinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#pointPriceChangeHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formRollupClickHandler);

    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  removeElement() {
    super.removeElement();
    if (this.#startDatepicker || this.#endDatepicker) {
      this.#startDatepicker.destroy();
      this.#endDatepicker.destroy();
      this.#startDatepicker = null;
      this.#endDatepicker = null;
    }
  }

  reset(point) {
    this.updateElement(
      FormPointView.parsePointToState(point)
    );
  }

  #setStartDatepicker = () => {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('[id="event-start-time-1"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        maxDate:  this._state.dateTo,
        'time_24hr': true,
        onClose: this.#dateStartChangeHandler
      }
    );
  };

  #setEndDatepicker = () => {
    this.#endDatepicker = flatpickr(
      this.element.querySelector('[id="event-end-time-1"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        'time_24hr': true,
        onClose: this.#dateEndChangeHandler
      }
    );
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormPointView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(FormPointView.parseStateToPoint(this._state));
  };

  #formRollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #pointOfferClickHandler = (evt) => {
    evt.preventDefault();
    const labelElement = evt.target.closest('.event__offer-label');
    if(labelElement) {
      const offerActive = labelElement.dataset.id;
      const offers = [...this._state.offers];
      this.updateElement({
        offers: toggleOffers(offers, offerActive),
      });
    }
  };

  #pointTypeClickHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.control.value;
    this.updateElement({
      type: newType,
      offers: []
    });
  };

  #pointDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    const newDestination = this.allDestinations.find((destinations) => evt.target.value === destinations.name);
    if(!newDestination) {
      evt.target.value = '';
      return;
    }
    this.updateElement({
      destination: newDestination.id,
    });
  };

  #pointPriceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: evt.target.value,
    });
  };

  #dateStartChangeHandler = ([userDate]) => {
    this.updateElement(
      {dateFrom: userDate,}
    );
  };

  #dateEndChangeHandler = ([userDate]) => {
    this.updateElement(
      { dateTo: userDate,}
    );
  };

  static parsePointToState(point) {
    return {...point,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isSaving;
    delete point.isDeleting;
    return point;
  }
}
