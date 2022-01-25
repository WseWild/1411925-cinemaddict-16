
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsView from '../view/films-view.js';
import ListEmptyView from '../view/list-empty-view';
import MoviePresenter from './movie-presenter.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import SortView from '../view/sort-view.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import {updateItem, sortFilmsByDate, sortFilmsByRating} from '../utils/utils.js';
import {SortType} from '../utils/const.js';

const FILM_COUNT_PER_STEP = 5;

export default class MovieListPresenter  {
  #filmsListContainer = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent =  new FilmsListContainerView();
  #filmsListTitleComponent = new FilmsListTitleView();
  #listEmptyView = new ListEmptyView();
  #showMoreButtonComponent = new ShowMoreBtnView();
  #sortFilmsViewComponent = new SortView();

  #currentSortType = SortType.DEFAULT;
  #filmCards = [];
  #filmComments = [];
  #moviePresenter = new Map();
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #sourcedBoardFilms = [];

  constructor(filmsListContainer) {
    this.#filmsListContainer = filmsListContainer;
  }

  init = (filmCards, comments) => {
    this.#filmCards = [...filmCards];
    this.#sourcedBoardFilms = [...filmCards];
    this.#filmComments = [...comments];

    render(this.#filmsListContainer, this.#filmsComponent.element, RenderPosition.BEFOREEND);
    render(this.#filmsComponent.element, this.#filmsListComponent.element, RenderPosition.BEFOREEND);
    render(this.#filmsListComponent.element, this.#filmsListContainerComponent.element,RenderPosition.AFTERBEGIN);

    this.#renderFilmBoard();
  }

  #renderListEmpty = () => {
    render(this.#filmsListContainer,this.#listEmptyView.element, RenderPosition.BEFOREEND);
  }

  #handleFilmChange = (updatedFilm) => {
    this.#filmCards = updateItem(this.#filmCards, updatedFilm);
    this.#sourcedBoardFilms = updateItem(this.#sourcedBoardFilms, updatedFilm);
    this.#moviePresenter.get(updatedFilm.id).init(updatedFilm);
  }

  #renderFilmBoard = () => {

    if (this.#filmCards.length === 0) {
      this.#renderListEmpty();
      return;
    }

    this.#renderFilmList();
    this.#renderSort();
  }

  #renderFilmList = () => {
    this.#renderFilmCards(0, Math.min(this.#filmCards.length, FILM_COUNT_PER_STEP ));

    if (this.#filmCards.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreBtn();
    }
    render(this.#filmsListComponent.element, this.#filmsListTitleComponent.element,RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
    this.#moviePresenter.forEach((presenter) => presenter.resetView());
  }

  #renderFilmCard = (film, filmComments) => {
    const moviePresenter = new MoviePresenter(this.#filmsListContainerComponent, this.#handleFilmChange, this.#handleModeChange);
    moviePresenter.init(film, filmComments);
    this.#moviePresenter.set(film.id, moviePresenter);
  }

  #renderFilmCards = (from, to) => {
    const filmComments = this.#filmComments.slice(from, to);
    this.#filmCards.slice(from, to).forEach((film, i) => this.#renderFilmCard(film, filmComments[i]));

  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearTaskList();
    this.#renderFilmList();
  }

  #clearTaskList = () => {
    this.#moviePresenter.forEach((presenter) => presenter.destroy());
    this.#moviePresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  }

  #sortFilms = (sortType) => {

    switch (sortType) {
      case SortType.BY_DATE:
        this.#filmCards.sort(sortFilmsByDate);
        break;
      case SortType.BY_RATING:
        this.#filmCards.sort(sortFilmsByRating);
        break;
      default:
        this.#filmCards = [...this.#sourcedBoardFilms];
    }

    this.#currentSortType = sortType;
  }

  #renderSort = () => {
    render(this.#filmsComponent.element, this.#sortFilmsViewComponent.element, RenderPosition.AFTERBEGIN);
    this.#sortFilmsViewComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #handleShowMoreBtnClick = () => {
    this.#renderFilmCards(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;
    if (this.#renderedFilmCount >= this.#filmCards.length) {
      remove(this.#showMoreButtonComponent);
    }
  }

  #renderShowMoreBtn = () => {
    render(this.#filmsListComponent.element,this.#showMoreButtonComponent.element, RenderPosition.BEFOREEND);
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreBtnClick);
  }
}


