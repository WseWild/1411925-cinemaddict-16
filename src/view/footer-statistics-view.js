import {createElement} from '../render.js';

const createFooterStatisticsTemplate = (stats) => (`<p>${stats.totalMovies} movies inside</p>`);

export default class FooterStatisticsView {
  #element = null;
  #stats = null;

  constructor(stats) {
    this.#stats = stats;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#stats);
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
