import SortView from '../view/sort-view.js';
import ListPointsView from '../view/list-points-view.js';
import FormPointView from '../view/form-point-view.js';
import PointView from '../view/point-view.js';
// import { RenderPosition } from '../framework/render.js';
import {render, replace} from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #listContainer = new ListPointsView();
  #boardPoints = [];

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

  #renderPoint(point, allOffers, allDestinations) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      allOffers,
      allDestinations,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new FormPointView({
      point,
      allOffers: this.allOffers,
      allDestinations: this.allDestinations,
      edit: true,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#listContainer.element);
  }

  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      render(new NoPointView(), this.#boardContainer);
      return;
    }
    render(new SortView(), this.#boardContainer);
    render(this.#listContainer, this.#boardContainer);
    // render(new FormPointView({allOffers: this.allOffers, allDestinations: this.allDestinations}), this.#listContainer.element, RenderPosition.AFTERBEGIN);
    //оставила что бы использовать для отрисовки при нажатии на кнопку New event

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.allOffers, this.allDestinations);
    }
  }
}


