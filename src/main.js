import FilmCardView from './view/site-film-card-view.js';
import FilmPopupView from './view/film-popup-view.js';
import FilmsListView from './view/films-list-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import ListEmptyView from './view/list-empty';
import LoadingStateView from './view/loading-state-view.js';
import NavMenuView from './view/main-nav-view.js';
import ProfileView from './view/profile-view.js';
import ShowMoreBtnView from './view/show-more-btn-view.js';
import SortView from './view/sort-view.js';
import StatisticsView from './view/statistics-view.js';
import renderElement from './render';
import {RenderPosition} from './render';
import {generateFilmMockInfo} from './mock/film.js';
import {generateFiltersMockInfo} from './mock/filters.js';
import {generateStatsMockInfo} from './mock/stats.js';
import {isEscEvent} from './utils/utils.js';
import {isEscapeEvent} from './utils/utils.js';

const FILM_COUNT = 0;
const FILM_COUNT_PER_STEP = 5;


export const films = new Array(FILM_COUNT).fill().map(generateFilmMockInfo);

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');


renderElement(siteHeaderElement, new ProfileView().element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new NavMenuView(generateFiltersMockInfo()).element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new LoadingStateView().element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortView().element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new StatisticsView(generateStatsMockInfo()).element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsListView().element, RenderPosition.BEFOREEND);

const siteFilmsContainer = siteMainElement.querySelectorAll('.films-list__container');
const siteFooter = document.querySelector('.footer');

const renderFilmCard = (filmListElement, film) => {
  const filmComponent = new FilmCardView(film);
  const filmComponentPopup = new FilmPopupView(film);
  const filmComponentPoster = filmComponent.element.querySelector('.film-card__poster');
  const filmComponentTitle =  filmComponent.element.querySelector('.film-card__title');
  const filmComponentComment =  filmComponent.element.querySelector('.film-card__comments');
  const filmPopupCrossBtn =  filmComponentPopup.element.querySelector('.film-details__close-btn');

  const openPopup = () => {
    siteBodyElement.classList.add('hide-overflow');
    siteFooter.appendChild(filmComponentPopup.element);
  };

  const closePopup = () => {
    siteBodyElement.classList.remove('hide-overflow');
    siteFooter.removeChild(filmComponentPopup.element);
  };

  const onEscKeyDown = (evt) => {
    if (isEscapeEvent(evt) || isEscEvent(evt)) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const closePopupWithEsc = () => {
    document.addEventListener('keydown', onEscKeyDown);
  };

  filmComponentPoster.addEventListener('click',() =>{
    openPopup();
    closePopupWithEsc();
  });

  filmComponentTitle.addEventListener('click',() =>{
    openPopup();
    closePopupWithEsc();
  });
  filmComponentComment.addEventListener('click',() =>{
    openPopup();
    closePopupWithEsc();
  });
  filmPopupCrossBtn.addEventListener('click', () =>{
    closePopup();
  });

  renderElement(filmListElement, filmComponent.element,RenderPosition.BEFOREEND);
};

const siteFilms = siteMainElement.querySelector('.films');

if (films.every) {
  renderElement(siteFilms,new ListEmptyView().element, RenderPosition.BEFOREEND);

} else {for (let num = 0; num < Math.min(films.length, FILM_COUNT_PER_STEP); num++) {
  renderFilmCard(siteFilmsContainer[0], films[num]);
}}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  renderElement(siteFilms,new ShowMoreBtnView().element, RenderPosition.BEFOREEND);

  const showMoreButton = siteMainElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {

    evt.preventDefault();
    films.slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP).forEach((film) => renderFilmCard(siteFilmsContainer[0], film));
    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });

}

const siteFooterStatistics = document.querySelector('.footer__statistics');

renderElement(siteFooterStatistics, new FooterStatisticsView(generateStatsMockInfo()).element, RenderPosition.BEFOREEND);


