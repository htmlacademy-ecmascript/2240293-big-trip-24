import Filters from './view/filters.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const header = document.querySelector('.trip-main');
const filtersContainer = header.querySelector('.trip-controls__filters');
const main = document.querySelector('.page-main');
const mainContainer = main.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: mainContainer});

render(new Filters(), filtersContainer);


boardPresenter.init();
