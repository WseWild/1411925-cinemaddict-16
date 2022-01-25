import AbstractView from './abstract-view.js';

const createSiteFilmPopupBottomContainerTemplate = () => (
  `<div class="film-details__bottom-container">
  </div>`
);

export default class FilmPopupBottomContainerView extends AbstractView {

  get template() {
    return createSiteFilmPopupBottomContainerTemplate();
  }

}


