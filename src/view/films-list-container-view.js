import AbstractView from './abstract-view.js';

const createSiteFilmsListContainerTemplate = () => (
  `<div class="films-list__container">
  </div>`
);

export default class FilmsListContainerView extends AbstractView {

  get template() {
    return createSiteFilmsListContainerTemplate();
  }

}
