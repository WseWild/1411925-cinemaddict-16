
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsView from '../view/films-view.js';
import ListEmptyView from '../view/list-empty-view';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import MoviePresenter from './movie-presenter.js';
import {updateItem} from '../utils/utils.js';

const FILM_COUNT_PER_STEP = 5;

export default class MovieListPresenter  {
  #filmsListContainer = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent =  new FilmsListContainerView();
  #filmsListTitleComponent = new FilmsListTitleView();
  #listEmptyView = new ListEmptyView();
  #showMoreButtonComponent = new ShowMoreBtnView();

  #filmCards = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #moviePresenter = new Map();

  constructor(filmsListContainer) {
    this.#filmsListContainer = filmsListContainer;
  }

  init = (filmCards) => {
    this.#filmCards = [...filmCards];

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
    this.#moviePresenter.get(updatedFilm.id).init(updatedFilm);
  }

  #renderFilmBoard = () => {

    if (this.#filmCards.length === 0) {
      this.#renderListEmpty();
      return;
    }

    this.#renderFilmList();
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

  #renderFilmCard = (film) => {
    const moviePresenter = new MoviePresenter(this.#filmsListContainerComponent, this.#handleFilmChange, this.#handleModeChange);
    moviePresenter.init(film);
    this.#moviePresenter.set(film.id, moviePresenter);
  }

  #renderFilmCards = (from, to) => {
    this.#filmCards.slice(from, to).forEach((film) => this.#renderFilmCard(film));
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


