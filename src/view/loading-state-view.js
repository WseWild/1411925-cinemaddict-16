import {createElement} from '../render.js';

const createSiteLoadingStateTemplate = () => ( '<h2 class="films-list__title">Loading...</h2>');

export default class LoadingStateView {
  #element = null;

  get template() {
    return createSiteLoadingStateTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

