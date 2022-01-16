import AbstractView from './abstract-view.js';


const createSiteFilmCardTemplate = (film) => {
  const {isWatchList, isWatched, isFavorites} = film;

  const isWatchListClassName = isWatchList
    ? 'film-card__controls-item--active'
    : '';

  const isWatchedClassName = isWatched
    ? 'film-card__controls-item--active'
    : '';

  const isFavoritesClassName = isFavorites
    ? 'film-card__controls-item--active'
    : '';

  return `<article class="film-card">
    <div class="film-card-wrapper">
      <h3 class="film-card__title">${film.title}</h3>
      <p class="film-card__rating">${film.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${film.productionYear}</span>
        <span class="film-card__duration">${film.duration}</span>
        <span class="film-card__genre">${film.genre}</span>
      </p>
      <img src="${film.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${film.description}</p>
      <a class="film-card__comments">${film.numOfComments} comments</a>
      </div>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchListClassName}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatchedClassName}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${isFavoritesClassName }" type="button">Mark as favorite</button>
      </div>
  </article>`;
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createSiteFilmCardTemplate (this.#film);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.element.querySelector('.film-card-wrapper').addEventListener('click', this.#clickHandler);
  }

  #addToWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchList();

  }

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();

  }

  #addToFavoritesClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToFavoritesClick();
  }

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchList = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#addToWatchlistClickHandler);
  }

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);

  }

  setAddToFavoritesClickHandler = (callback) => {
    this._callback.addToFavoritesClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#addToFavoritesClickHandler);

  }

}
