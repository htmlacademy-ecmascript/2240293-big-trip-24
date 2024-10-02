import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render, RenderPosition } from './framework/render.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic danilinaMId2240293';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const header = document.querySelector('.trip-main');
const filtersContainer = header.querySelector('.trip-controls__filters');
const main = document.querySelector('.page-main');
const mainContainer = main.querySelector('.trip-events');
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: mainContainer,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainer,
  filterModel: filterModel,
  pointsModel: pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}


boardPresenter.init();
pointsModel.init()
  .finally(() => {
    filterPresenter.init();
    render(newPointButtonComponent, header, RenderPosition.AFTEREND);
  });
