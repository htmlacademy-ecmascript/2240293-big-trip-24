import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition , remove} from '../framework/render';

export default class TripInfoPresenter {
  #pointsModel = null;
  #headerContainer = null;
  #tripInfoComponent = null;

  constructor({pointsModel, header}) {
    this.#headerContainer = header;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return this.#pointsModel.points;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  init() {
    this.#renderTripInfo();
  }

  #renderTripInfo() {
    const points = this.points;
    const destinations = this.destinations;
    const offers = this.offers;
    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = new TripInfoView({points, destinations, offers});
    render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
