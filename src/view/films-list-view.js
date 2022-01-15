import AbstractView from './abstract-view.js';

const createSiteFilmsListTemplate = () => (
  `<section class="films-list">
  </section>`
);

export default class FilmsListView extends AbstractView {

  get template() {
    return createSiteFilmsListTemplate();
  }

}
