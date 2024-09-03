import FiltersView from './view/filters-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';

const header = document.querySelector('.trip-main');
const filtersContainer = header.querySelector('.trip-controls__filters');
const main = document.querySelector('.page-main');
const mainContainer = main.querySelector('.trip-events');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({boardContainer: mainContainer, pointsModel});

render(new FiltersView(), filtersContainer);


boardPresenter.init();
