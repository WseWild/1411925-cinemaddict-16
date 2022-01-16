import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import {isEscEvent} from '../utils/utils.js';
import {isEscapeEvent} from '../utils/utils.js';
import {render,RenderPosition, replace, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENPOPUP: 'OPENPOPUP',
};


export default class MoviePresenter {
  #filmsListContainerComponent = null;
  #changeData = null;
  #changeMode = null;

  #filmComponent = null;
  #filmComponentPopup = null;
  #siteBodyElement =  document.querySelector('body');

  #film = null;
  #mode = Mode.DEFAULT


  constructor(filmsListContainer, changeData, changeMode) {
    this.#filmsListContainerComponent = filmsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;
    const prevFilmComponentPopup = this.#filmComponentPopup;

    this.#filmComponent = new FilmCardView(film);
    this.#filmComponentPopup = new FilmPopupView(film);

    this.#filmComponent.setClickHandler(this.#handleFilmCardClick );
    this.#filmComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmComponent.setAddToFavoritesClickHandler(this.#handleAddToFavoritesClick);

    if (prevFilmComponent === null || prevFilmComponentPopup === null) {
      render(this.#filmsListContainerComponent.element, this.#filmComponent.element,RenderPosition.BEFOREEND);
      return;
    }

    if (this.#filmsListContainerComponent.element.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if(this.#mode === Mode.OPENPOPUP) {
      this.#handleFilmCardClick();
      replace(this.#filmComponentPopup, prevFilmComponentPopup);
      document.querySelector('.film-details__close-btn').addEventListener('click', this.#handleFilmCardClose );
    }

    remove(prevFilmComponent);
    remove(prevFilmComponentPopup);
  }

  destroy = ()=> {
    remove(this.#filmComponent);
    remove(this.#filmComponentPopup);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#handleFilmCardClose();
    }
  }

  #openPopup = () => {
    this.#siteBodyElement.classList.add('hide-overflow');
    this.#siteBodyElement.appendChild(this.#filmComponentPopup.element);
    document.querySelector('.film-details__close-btn').addEventListener('click', this.#handleFilmCardClose );
    this.#filmComponentPopup.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmComponentPopup.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmComponentPopup.setAddToFavoritesClickHandler(this.#handleAddToFavoritesClick);
    this.#changeMode();
    this.#mode = Mode.OPENPOPUP;
  };

  #closePopup = () => {
    this.#siteBodyElement.classList.remove('hide-overflow');
    this.#siteBodyElement.removeChild(this.#filmComponentPopup.element);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeEvent(evt) || isEscEvent(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#closePopup();
    }
  };

  #closePopupWithEsc = () => {
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFilmCardClick = () => {
    this.#openPopup();
    this.#closePopupWithEsc();
  }

  #handleFilmCardClose = () => {
    this.#closePopup();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #handleAddToWatchlistClick = () => {
    this.#changeData({...this.#film, isWatchList: !this.#film.isWatchList});
  }

  #handleAlreadyWatchedClick = () => {
    this.#changeData({...this.#film, isWatched: !this.#film.isWatched});
  }

  #handleAddToFavoritesClick = () => {
    this.#changeData({...this.#film, isFavorites: !this.#film.isFavorites});
  }

}
