import SortView from '../view/sort-view.js';
import ListPointsView from '../view/list-points-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { render, remove } from '../framework/render.js';
import {updateItem} from '../utils/common.js';
import { sortPointDate, sortPointPrice, sortPointTime } from '../utils/points.js';
import { SortType, FiltersValues } from '../const.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #listContainer = new ListPointsView();
  #boardPoints = [];
  #sortComponent = null;
  #noPointComponent = null;
  #pointPresenters = new Map();
  #newPointPresenters = null;
  #currentSortType = SortType.DAY;

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.allOffers = [...this.#pointsModel.offers];
    this.allDestinations = [...this.#pointsModel.destinations];
    this.#boardPoints.sort(sortPointDate);
    this.#renderBoard();
  }

  #renderSort(sortType) {

    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      sortType
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
    this.#boardPoints.forEach((point) => {
      this.#renderPoint(point, this.allOffers, this.allDestinations);
    });
  }

  #renderNoPoint(filter) {
    this.#noPointComponent = new NoPointView(filter);
    render(this.#noPointComponent, this.#boardContainer);
  }


  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      this.#renderNoPoint(FiltersValues.EVERYTHING);
      return;
    }
    this.#renderSort(this.#currentSortType);
    this.#renderPointsList();
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#boardPoints.sort(sortPointDate);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPointPrice);
        break;
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    remove(this.#sortComponent);
    this.#renderSort(sortType);
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


