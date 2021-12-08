import {createElement} from '../render.js';

export const createSiteNavMenuTemplate = (filters) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filters.numIsWatchList}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filters.numIsWatched}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filters.numIsFavorites}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

export default class NavMenuView {
  #filters = null;
  #element = null;

  constructor(filters) {
    this.#filters = filters;
  }

  get template() {
    return createSiteNavMenuTemplate(this.#filters);
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