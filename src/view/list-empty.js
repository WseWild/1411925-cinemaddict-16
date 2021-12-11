import {createElement} from '../render.js';

const createSiteListEmptyTemplate = () =>  ('<h2 class="films-list__title">There are no movies in our database</h2>');

export default class ListEmptyView {
  #element = null;

  get template() {
    return createSiteListEmptyTemplate();
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
