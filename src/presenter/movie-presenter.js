import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import {isEscEvent} from '../utils/utils.js';
import {isEscapeEvent} from '../utils/utils.js';
import {render,RenderPosition, replace, remove} from '../utils/render.js';
import FilmPopupCommentView from '../view/film-popup-comment-view.js';
import FilmPopupBottomContainerView from '../view/film-popup-bottom-container-view.js';
import FilmPopupCommnetsListView from '../view/film-popup-comments-list-view.js';
import FilmPopupCommnetsWrapView from '../view/film-popup-comments-wrap-view.js';
import FilmPopupCommentsTitleView from '../view/film-popup-comments-title-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENPOPUP: 'OPENPOPUP',
};


export default class MoviePresenter {
  #filmsListContainerComponent = null;
  #changeData = null;
  #changeMode = null;


  #filmComponent = null;
  #filmComponentPopup = null;
  #siteBodyElement =  document.querySelector('body');
  #sitePopupFormElement = null;
  #filmPopupCommentComponent = null;
  #filmPopupCommnetsListView = null;
  #filmPopupBottomContainerView = null;
  #filmPopupCommnetsWrapView = null;
  #filmPopupCommentsTitleView = null;

  #film = null;
  #filmComments = [];
  #mode = Mode.DEFAULT


  constructor(filmsListContainer, changeData, changeMode) {
    this.#filmsListContainerComponent = filmsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film, filmComments) => {
    this.#film = film;
    this.#filmComments = filmComments;
    const prevFilmComponent = this.#filmComponent;
    const prevFilmComponentPopup = this.#filmComponentPopup;

    this.#filmComponent = new FilmCardView(film);
    this.#filmComponentPopup = new FilmPopupView(film);
    this.#filmPopupCommnetsListView = new FilmPopupCommnetsListView();
    this.#filmPopupBottomContainerView  = new FilmPopupBottomContainerView(film);
    this.#filmPopupCommnetsWrapView = new FilmPopupCommnetsWrapView();
    this.#filmPopupCommentsTitleView = new FilmPopupCommentsTitleView(film);

    this.#filmComponent.setClickHandler(this.#handleFilmCardClick );
    this.#filmComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmComponent.setAddToFavoritesClickHandler(this.#handleAddToFavoritesClick);

    if (prevFilmComponent === null || prevFilmComponentPopup === null) {
      render(this.#filmsListContainerComponent.element, this.#filmComponent.element,RenderPosition.BEFOREEND);
      return;
    }

    if (this.#filmsListContainerComponent.element.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if(this.#mode === Mode.OPENPOPUP) {
      this.#handleFilmCardClick();
      replace(this.#filmComponentPopup, prevFilmComponentPopup);
      document.querySelector('.film-details__close-btn').addEventListener('click', this.#handleFilmCardClose );

    }


    remove(prevFilmComponent);
    remove(prevFilmComponentPopup);
  }

  destroy = ()=> {
    remove(this.#filmComponent);
    remove(this.#filmComponentPopup);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#handleFilmCardClose();
    }
  }

  #openPopup = () => {
    this.#siteBodyElement.classList.add('hide-overflow');
    this.#siteBodyElement.appendChild(this.#filmComponentPopup.element);
    this.#sitePopupFormElement = this.#siteBodyElement.querySelector('.film-details__inner');
    document.querySelector('.film-details__close-btn').addEventListener('click', this.#handleFilmCardClose );
    this.#filmComponentPopup.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmComponentPopup.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmComponentPopup.setAddToFavoritesClickHandler(this.#handleAddToFavoritesClick);
    this.#changeMode();
    this.#mode = Mode.OPENPOPUP;
    // генерация комментариев
    this.#filmPopupBottomContainer();
    this.#commentTitle();
    this.#filmPopupCommnetsWrap();
    this.#commentListComponents();


  };

  #filmPopupBottomContainer = () => {
    render(this.#filmComponentPopup.element, this.#filmPopupBottomContainerView.element , RenderPosition.BEFOREEND);

  }

  #filmPopupCommnetsWrap  = () => {
    render(this.#filmPopupBottomContainerView.element, this.#filmPopupCommnetsWrapView.element , RenderPosition.BEFOREEND);
  }

  #renderCommentsListComponent = () => {
    render(this.#filmPopupCommnetsWrapView.element, this.#filmPopupCommnetsListView.element , RenderPosition.AFTERBEGIN);
  }

  #commentListComponents = () => {
    this.#renderCommentsListComponent();
    this.#filmComments.forEach((com) =>  this.#renderCommentView(com));

    render(this.#filmPopupCommnetsListView.element, this.#filmPopupCommentComponent.element , RenderPosition.BEFOREEND);
  }

  #renderCommentView = (com) => {
    this.#filmPopupCommentComponent = new FilmPopupCommentView(com);
    render(this.#filmPopupCommnetsListView.element, this.#filmPopupCommentComponent.element , RenderPosition.BEFOREEND);
  }

  #commentTitle = () => {
    render(this.#filmPopupBottomContainerView.element, this.#filmPopupCommentsTitleView.element , RenderPosition.AFTERBEGIN);
  }

  #closePopup = () => {
    this.#siteBodyElement.classList.remove('hide-overflow');
    this.#siteBodyElement.removeChild(this.#filmComponentPopup.element);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeEvent(evt) || isEscEvent(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#closePopup();
    }
  };

  #closePopupWithEsc = () => {
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFilmCardClick = () => {
    this.#openPopup();
    this.#closePopupWithEsc();
  }

  #handleFilmCardClose = () => {
    this.#closePopup();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #handleAddToWatchlistClick = () => {
    this.#changeData({...this.#film, isWatchList: !this.#film.isWatchList});
  }

  #handleAlreadyWatchedClick = () => {
    this.#changeData({...this.#film, isWatched: !this.#film.isWatched});
  }

  #handleAddToFavoritesClick = () => {
    this.#changeData({...this.#film, isFavorites: !this.#film.isFavorites});
  }
}
