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

  init() {
    this.#renderTripInfo();
  }

  #renderTripInfo() {
    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = new TripInfoView({
      points: this.#pointsModel.points,
      destinations: this.#pointsModel.destinations,
      offers: this.#pointsModel.offers
    });
    render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
