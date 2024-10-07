import AbstractView from '../framework/view/abstract-view';
import { humanizePointDate } from '../utils/points';

function createTripInfoTemplate(points, destinations, offers) {
  const destinationsPoint = points.map((point) => destinations.find((destination) => destination.id === point.destination).name);
  const title = destinationsPoint.length > 3 ? `${destinationsPoint[0]}-...-${destinationsPoint[destinationsPoint.length - 1]}` : `${destinationsPoint.join('-')}`;
  const duration = `${humanizePointDate(points[0].dateFrom)} - ${humanizePointDate(points[points.length - 1].dateTo)}`;
  let basePricePoints = 0;
  let offersPrice = 0;

  points.forEach((point) => {
    basePricePoints = basePricePoints + Number(point.basePrice);
  });

  points.map((point) => {
    const offersPoint = offers.find((offer) => offer.type === point.type).offers;
    point.offers.forEach((offerId) => {
      offersPrice = offersPrice + Number(offersPoint.find((offerPoint) => offerPoint.id === offerId).price);
    });
  });

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${title}</h1>

              <p class="trip-info__dates">${duration}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${basePricePoints + offersPrice}</span>
            </p>
          </section>`;
}

export default class TripInfoView extends AbstractView{
  #points = null;

  constructor({points, destinations, offers}) {
    super();
    this.#points = points;
    this.destinations = destinations;
    this.offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.destinations, this.offers);
  }
}
