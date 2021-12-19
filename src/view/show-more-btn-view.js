import AbstractView from './abstract-view.js';

const createShowMoreBtnTamplate = () => ('<button class="films-list__show-more">Show more</button>');

export default class ShowMoreBtnView extends AbstractView {

  get template() {
    return createShowMoreBtnTamplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  }

}
