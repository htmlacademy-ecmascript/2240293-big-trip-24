import Sort from '../view/sort.js';
import ListPoints from '../view/list-points.js';
import FormPoint from '../view/form-point.js';
import Point from '../view/point.js';
import {RenderPosition, render} from '../render.js';


export default class BoardPresenter {
  listContainer = new ListPoints();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new Sort(), this.boardContainer);
    render(this.listContainer, this.boardContainer);
    render(new FormPoint(true, false), this.listContainer.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < 3; i++) {
      render(new Point(), this.listContainer.getElement());
    }
  }
}


