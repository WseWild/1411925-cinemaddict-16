import FooterStatisticsView from './view/footer-statistics-view.js';
import LoadingStateView from './view/loading-state-view.js';
import MovieListPresenter from './presenter/movie-list-presenter.js';
import NavMenuView from './view/main-nav-view.js';
import ProfileView from './view/profile-view.js';
import SortView from './view/sort-view.js';
import StatisticsView from './view/statistics-view.js';
import {RenderPosition, render} from './utils/render.js';
import {generateFilmMockInfo} from './mock/film.js';
import {generateFiltersMockInfo} from './mock/filters.js';
import {generateStatsMockInfo} from './mock/stats.js';

const FILM_COUNT = 6;

export const films = new Array(FILM_COUNT).fill().map(generateFilmMockInfo);

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');
const movieListPresenter = new MovieListPresenter(siteMainElement);


render(siteHeaderElement, new ProfileView().element, RenderPosition.BEFOREEND);
render(siteMainElement, new NavMenuView(generateFiltersMockInfo()).element, RenderPosition.BEFOREEND);
render(siteMainElement, new LoadingStateView().element, RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().element, RenderPosition.BEFOREEND);
render(siteMainElement, new StatisticsView(generateStatsMockInfo()).element, RenderPosition.BEFOREEND);

const siteFooterStatistics = document.querySelector('.footer__statistics');

render(siteFooterStatistics, new FooterStatisticsView(generateStatsMockInfo()).element, RenderPosition.BEFOREEND);

movieListPresenter.init(films);

