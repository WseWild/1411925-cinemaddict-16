import dayjs from 'dayjs';
import {generateRandomArrayElement}  from '../utils/utils.js';
import {getRandomInteger}  from '../utils/utils.js';
import {nanoid} from 'nanoid';

const MIN_COMMENT_YEAR = 2011;
const MAX_COMMENT_YEAR = 2021;


const generateCommentText = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.' ,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis ',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Aliquam id orci ut lectus varius viverra.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  ];

  return generateRandomArrayElement(descriptions);

};

const generateAuthorName = () => {
  const names = [
    'Ilya Reilly',
    'Jon Doeh' ,
    'Fantomas',
    'Mr.Brain',
    'Bugz',
  ];

  return generateRandomArrayElement(names);
};

const generateEmotion = () => {
  const emotions = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];
  return generateRandomArrayElement(emotions);
};

const generateFilmCommentMockInfo = () => ({
  idComment: nanoid(),
  author: generateAuthorName(),
  commentText: generateCommentText(),
  date: dayjs().year(getRandomInteger(MIN_COMMENT_YEAR, MAX_COMMENT_YEAR)).month(getRandomInteger(1, 12)).day(getRandomInteger(1, 28)).hour(getRandomInteger(0, 24)).minute(getRandomInteger(0,59)).format('YYYY-MM-DDTHH:mm'),
  emotion: generateEmotion(),
});

export const generateCommentsInfo = () =>  new Array(getRandomInteger(0, 7)).fill().map(generateFilmCommentMockInfo);

