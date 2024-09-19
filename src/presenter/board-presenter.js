import SortView from '../view/sort-view.js';
import ListPointsView from '../view/list-points-view.js';
// import { RenderPosition } from '../framework/render.js';
import {render } from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import { sortPointDate, sortPointPrice, sortPointTime } from '../utils/points.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #listContainer = new ListPointsView();
  #boardPoints = [];
  #sortComponent = null;
  #noPointComponent = new NoPointView();
  #pointPresenters = new Map();
  #currentSortType = null;
  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#currentSortType = 'day';
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.allOffers = [...this.#pointsModel.offers];
    this.allDestinations = [...this.#pointsModel.destinations];
    this.#boardPoints.sort(sortPointDate);
    this.#renderBoard();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });


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

  #sortPoints = (sortType) => {
    switch (sortType) {
      case 'day':
        this.#boardPoints.sort(sortPointDate);
        break;
      case 'time':
        this.#boardPoints.sort(sortPointTime);
        break;
      case 'price':
        this.#boardPoints.sort(sortPointPrice);
        break;
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.allOffers, this.allDestinations);
  };

}


