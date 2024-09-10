import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDate, humanizePointDuration, capitalizeFirstLetter, FORMATS} from '../utils.js';

function createOffersTemplate(e, type, allOffers) {
  const offerDefault = allOffers.find((item) => item.type === type);
  const offer = offerDefault.offers.find((item) => item.id === e);
  return `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.prise}</span>
    </li>`;
}

function createPointTemplate(point, offers, destinations) {
  const {type, destination: destinationPoint, dateFrom, dateTo, basePrice, offers: offersPoint, isFavorite} = point;
  const allOffers = offers;
  const allDestinations = destinations;
  const destinationDefault = allDestinations.find((item) => item.id === destinationPoint).name;
  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${humanizePointDate(dateFrom)}</time>
        <div class="event__${type}">
          <img class="event__${type}-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalizeFirstLetter(type)} ${destinationDefault}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${humanizePointDate(dateFrom, FORMATS.TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${humanizePointDate(dateTo, FORMATS.TIME)}</time>
          </p>
          <p class="event__duration">${humanizePointDuration(dateFrom,dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersPoint.map((e) => createOffersTemplate(e, type, allOffers)).join('')}
        </ul>
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : null}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
}

export default class PointView extends AbstractView{
  constructor(point, allOffers, allDestinations) {
    super();
    this.point = point;
    this.allOffers = allOffers;
    this.allDestinations = allDestinations;
  }

  get template() {
    return createPointTemplate(this.point, this.allOffers, this.allDestinations);
  }
}
