import AbstractView from './abstract-view.js';

const createFooterStatisticsTemplate = (stats) => (`<p>${stats.totalMovies} movies inside</p>`);

export default class FooterStatisticsView extends AbstractView {
  #stats = null;

  constructor(stats) {
    super();
    this.#stats = stats;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#stats);
  }
}
