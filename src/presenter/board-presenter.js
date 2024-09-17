import SortView from '../view/sort-view.js';
import ListPointsView from '../view/list-points-view.js';
// import { RenderPosition } from '../framework/render.js';
import {render } from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #listContainer = new ListPointsView();
  #boardPoints = [];
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();
  #pointPresenters = new Map();

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.allOffers = [...this.#pointsModel.offers];
    this.allDestinations = [...this.#pointsModel.destinations];
    this.#renderBoard();
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderPoint(point, allOffers, allDestinations) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#listContainer.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, allOffers, allDestinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPointsList() {
    render(this.#listContainer, this.#boardContainer);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.allOffers, this.allDestinations);
    }
  }

  #renderNoPoint() {
    render(this.#noPointComponent, this.#boardContainer);
  }

  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      this.#renderNoPoint();
      return;
    }
    this.#renderSort();
    this.#renderPointsList();
    // render(new FormPointView({allOffers: this.allOffers, allDestinations: this.allDestinations}), this.#listContainer.element, RenderPosition.AFTERBEGIN);
    //оставила что бы использовать для отрисовки при нажатии на кнопку New event
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.allOffers, this.allDestinations);
  };

}


