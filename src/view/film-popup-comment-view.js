import AbstractView from './abstract-view.js';

const createSiteFilmPopupComments = (comment) => {
  const {emotion} = comment;
  let emojiPic = emotion;

  switch (emojiPic) {
    case 'smile':
      emojiPic = './images/emoji/smile.png';
      break;
    case 'sleeping' :
      emojiPic = './images/emoji/sleeping.png';
      break;
    case 'puke':
      emojiPic = './images/emoji/puke.png';
      break;
    case 'angry':
      emojiPic = './images/emoji/angry.png';
      break;
  }


  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${emojiPic}" width="55" height="55" alt="emoji-${emotion}">
    </span>
      <div>
        <p class="film-details__comment-text">${comment.commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${comment.date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
    </div>
  </li>`;
};


export default class FilmPopupCommentView extends AbstractView {
  #comment = null;

  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createSiteFilmPopupComments(this.#comment);
  }
}
