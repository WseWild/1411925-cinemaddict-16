import AbstractView from './abstract-view.js';

const createSiteLoadingStateTemplate = () => ( '<h2 class="films-list__title">Loading...</h2>');

export default class LoadingStateView extends AbstractView {

  get template() {
    return createSiteLoadingStateTemplate();
  }

}

