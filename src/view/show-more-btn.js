import {createElement} from '../render.js';

const createShowMoreBtnTamplate = () => ('<button class="films-list__show-more">Show more</button>');

export default class ShowMoreBtnView {
  #element = null;

  get template() {
    return createShowMoreBtnTamplate();
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
