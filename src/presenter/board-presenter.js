import SortView from '../view/sort-view.js';
import ListPointsView from '../view/list-points-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {filter} from '../utils/filter.js';
import { render, remove } from '../framework/render.js';
import { sortPointDate, sortPointPrice, sortPointTime } from '../utils/points.js';
import { SortType, UpdateType, UserAction, FiltersValues } from '../const.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #listContainer = new ListPointsView();
  #sortComponent = null;
  #noPointComponent = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FiltersValues.EVERYTHING;

  constructor({boardContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newPointPresenter = new NewPointPresenter({
      allOffers: this.offers,
      allDestinations: this.destinations,
      pointListContainer: this.#listContainer.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;

    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }
    return filteredPoints.sort(sortPointDate);
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  init() {
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FiltersValues.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderBoard() {
    const filterType = this.#filterModel.filter;
    if (this.points.length === 0) {
      this.#renderNoPoint(filterType);
      return;
    }
    this.#renderSort();
    this.#renderPointsList();
  }

  #renderNoPoint() {
    this.#noPointComponent = new NoPointView({filterType: this.#filterType});
    render(this.#noPointComponent, this.#boardContainer);
  }


  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      sortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#boardContainer);
  }

  #renderPointsList() {
    render(this.#listContainer, this.#boardContainer);
    this.points.forEach((point) => {
      this.#renderPoint(point, this.offers, this.destinations);
    });
  }

  #renderPoint(point, allOffers, allDestinations) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#listContainer.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, allOffers, allDestinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    remove(this.#sortComponent);
    this.#renderSort(sortType);
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.offers, this.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };
}


