import AbstractView from './abstract-view.js';

const createFilmPopupCommentsTitleTemplate = (film) => (
  `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.numOfComments}</span></h3>`
);

export default class FilmPopupCommentsTitleView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmPopupCommentsTitleTemplate(this.#film);
  }

}
