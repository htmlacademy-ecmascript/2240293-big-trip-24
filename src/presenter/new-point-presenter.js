import FormPointView from '../view/form-point-view.js';
import { remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import { FiltersValues } from '../const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #filterModel = null;
  #pointEditComponent = null;

  constructor({allOffers, allDestinations, pointListContainer, onDataChange, onDestroy, filterModel}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.allOffers = allOffers;
    this.allDestinations = allDestinations;
    this.#filterModel = filterModel;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }
    this.#pointEditComponent = new FormPointView({
      allOffers: this.allOffers,
      allDestinations: this.allDestinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onRollupClick: this.#handleRollupClick
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    this.#handleDestroy();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
    this.#filterModel.setFilter(UpdateType.MAJOR, FiltersValues.EVERYTHING);
  };

  #handleRollupClick = () => {
    this.destroy();
    this.#filterModel.setFilter(UpdateType.MAJOR, FiltersValues.EVERYTHING);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
      this.#filterModel.setFilter(UpdateType.MAJOR, FiltersValues.EVERYTHING);
    }
  };
}
