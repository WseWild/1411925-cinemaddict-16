import AbstractView from './abstract-view.js';

const createSiteFilmPopupCommnetsListTemplate = () => (
  `<ul class="film-details__comments-list">
  </ul>`
);

export default class FilmPopupCommnetsListView extends AbstractView {

  get template() {
    return createSiteFilmPopupCommnetsListTemplate();
  }

}
