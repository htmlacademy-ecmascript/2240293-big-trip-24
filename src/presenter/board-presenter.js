import SortView from '../view/sort-view.js';
import ListPointsView from '../view/list-points-view.js';
import FormPointView from '../view/form-point-view.js';
import PointView from '../view/point-view.js';
import {RenderPosition, render} from '../render.js';


export default class BoardPresenter {
  listContainer = new ListPointsView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getTasks()];
    render(new SortView(), this.boardContainer);
    render(this.listContainer, this.boardContainer);
    render(new FormPointView(true, false), this.listContainer.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new PointView(this.boardPoints[i]), this.listContainer.getElement());
    }
  }
}


