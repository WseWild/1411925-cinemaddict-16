import {generateFilmMockInfo} from './mock/film.js';
import {generateStatsMockInfo} from './mock/stats.js';
import {generateFiltersMockInfo} from './mock/filters.js';
import SiteProfileView from './view/profile.js';
import SiteNavMenuView from './view/main-nav.js';
import SiteStatisticsView from './view/stats.js';
import SiteSortView from './view/sort.js';
import SiteFilmsListView from './view/films-list.js';
import SiteFilmCardView from './view/film-card.js';
import ShowMoreBtnView from './view/show-more-btn.js';
import SiteLoadingStateView from './view/loading-state.js';
import SiteFilmPopupView from './view/popup.js';
import FooterStatisticsView from './view/footer-stats.js';
import {RenderPosition, renderElement} from './render';

const FILM_COUNT = 15;
const FILM_COUNT_PER_STEP = 5;


export const films = new Array(FILM_COUNT).fill().map(generateFilmMockInfo);

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');


renderElement(siteHeaderElement, new SiteProfileView().element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteNavMenuView(generateFiltersMockInfo()).element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteLoadingStateView().element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteSortView().element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteStatisticsView(generateStatsMockInfo()).element, RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteFilmsListView().element, RenderPosition.BEFOREEND);

const siteFilmsContainer = siteMainElement.querySelectorAll('.films-list__container');
const siteFooter = document.querySelector('.footer');

const renderFilmCard = (filmListElement, film) => {
  const filmComponent = new SiteFilmCardView(film);
  const filmComponentPopup = new SiteFilmPopupView(film);
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
    if (evt.key === 'Escape' || evt.key === 'Esc') {
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

for (let num = 0; num < Math.min(films.length, FILM_COUNT_PER_STEP); num++) {
  renderFilmCard(siteFilmsContainer[0], films[num]);
}

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

const siteFooterStatisticks = document.querySelector('.footer__statistics');

renderElement(siteFooterStatisticks, new FooterStatisticsView(generateStatsMockInfo()).element, RenderPosition.BEFOREEND);
