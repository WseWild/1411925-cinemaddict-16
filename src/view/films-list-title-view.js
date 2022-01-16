import AbstractView from './abstract-view.js';

const createSiteFilmsListTitleTemplate = () => (
  `<h2 class="films-list__title visually-hidden">
    All movies. Upcoming
  </h2>`
);

export default class FilmsListView extends AbstractView {

  get template() {
    return createSiteFilmsListTitleTemplate();
  }

}
