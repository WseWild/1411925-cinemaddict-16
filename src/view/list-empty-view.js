import AbstractView from './abstract-view.js';

const createSiteListEmptyTemplate = () =>  ('<h2 class="films-list__title">There are no movies in our database</h2>');

export default class ListEmptyView extends AbstractView {

  get template() {
    return createSiteListEmptyTemplate();
  }

}
