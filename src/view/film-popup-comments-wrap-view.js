import AbstractView from './abstract-view.js';

const createSiteFilmPopupCommnetsWrapTemplate = () => (
  `<section class="film-details__comments-wrap">
  </section>`
);

export default class FilmPopupCommnetsWrapView extends AbstractView {

  get template() {
    return createSiteFilmPopupCommnetsWrapTemplate();
  }

}
