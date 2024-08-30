import {createElement} from '../render.js';

const TYPES_ITEM = [
  {
    value: 'taxi',
    text: 'Taxi',
  },
  {
    value: 'bus',
    text: 'Bus',
  },
  {
    value: 'train',
    text: 'Train',
  },
  {
    value: 'ship',
    text: 'Ship',
  },
  {
    value: 'drive',
    text: 'Drive',
  },
  {
    value: 'flight',
    text: 'Flight',
  },
  {
    value: 'check-in',
    text: 'Check-in',
  },
  {
    value: 'sightseeing',
    text: 'Sightseeing',
  },
  {
    value: 'restaurant',
    text: 'Restaurant',
  },
];

const OFFERS = [
  {
    value: 'luggage',
    title: 'Add luggage',
    prise: '30'
  },
  {
    value: 'comfort',
    title: 'Switch to comfort class',
    prise: '100'
  },
  {
    value: 'meal',
    title: 'Add meal',
    prise: '15'
  },
  {
    value: 'seats',
    title: 'Choose seats',
    prise: '5'
  },
  {
    value: 'train',
    title: 'Travel by train',
    prise: '40'
  },
];

function createTypeItemTemplate({value, text}) {
  return `
    <div class="event__type-item">
      <input id="event-type-${value}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${value}">
      <label class="event__type-label  event__type-label--${value}" for="event-type-${value}-1">${text}</label>
    </div>`;
}

function createDetailsTemplate(offers = true, destination = true) {
  const details = [];
  if (offers) {
    details.push(`
    <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${OFFERS.map(({value, title, prise})=> `
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${value}-1" type="checkbox" name="event-offer-${value}" ${value === 'luggage' || value === 'comfort' ? 'checked' : false}>
              <label class="event__offer-label" for="event-offer-${value}-1">
                <span class="event__offer-title">${title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${prise}</span>
              </label>
            </div>`).join('')}
          </div>
        </section>`);
  }

  if (destination) {
    details.push(`
      <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
              <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
            </div>
          </div>
        </section>`);
  }

  return details;
}


function createEventTemplate(offers, destination) {
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
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
              Flight
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          ${createDetailsTemplate(offers, destination).join('')}
        </section>
      </form>
    </li>`;
}


export default class FormPoint {
  getTemplate() {
    return createEventTemplate();
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
