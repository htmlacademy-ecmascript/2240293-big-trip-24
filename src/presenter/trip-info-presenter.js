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
    if (this.#pointsModel.points.length === 0) {
      if (this.#tripInfoComponent !== null) {
        this.#removeTripIfoComponent();
      }
      return;
    }

    this.#renderTripInfo();
  }

  #renderTripInfo() {
    if (this.#tripInfoComponent !== null) {
      this.#removeTripIfoComponent();
    }

    this.#tripInfoComponent = new TripInfoView({
      points: this.#pointsModel.points,
      destinations: this.#pointsModel.destinations,
      offers: this.#pointsModel.offers
    });
    render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #removeTripIfoComponent = () => {
    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;
  };

  #handleModelEvent = () => {
    this.init();
  };
}
