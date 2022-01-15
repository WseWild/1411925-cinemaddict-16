import dayjs from 'dayjs';
import {generateFixDurationTime}  from '../utils/utils.js';
import {generateRandomArrayElement}  from '../utils/utils.js';
// import {getRandomBoolean} from '../utils/utils.js';
import {getRandomInteger}  from '../utils/utils.js';
import {getRandomPositiveFloat}  from '../utils/utils.js';
import {nanoid} from 'nanoid';

const LAST_MONTH_DAY = 31;
const MAX_COMMENT_VALUE =5;
const MAX_FILM_DURATION_VALUE = 230;
const MAX_FILM_YEAR = 2021;
const MAX_RATING_VALUE = 10;
const MIN_FILM_DURATION_VALUE = 30;
const MIN_FILM_YEAR = 1930;

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.' ,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  ];

  return generateRandomArrayElement(descriptions);

};

const generateFilmPoster = () => {
  const posters = [
    './images/posters/sagebrush-trail.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/the-man-with-the-golden-arm.jpg',
    './images/posters/the-great-flamarion.jpg',
  ];

  return generateRandomArrayElement(posters);
};

const generateFilmTitle = () => {
  const titles = [
    'The Dance of Life',
    'Burlesque comic',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'The Great Flamarion',
    'Santa Claus Conquers the Martians',
    'Made for Each Other',
  ];

  return generateRandomArrayElement(titles);
};

export const generateGenre = () => {
  const genres = [
    'Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Thriller',
  ];

  return generateRandomArrayElement(genres);
};

const generateDirector = () => {
  const directors = [
    'David Fincher',
    'Paul Thomas Andersony',
    'Kathryn Bigelow',
    'Rian Johnson',
    'The Coen Brothers',
    'Harmony Korine',
    'David Cronenberg',
  ];

  return generateRandomArrayElement(directors);
};

const generateWriters = () => {
  const writers = [
    'Fyodor Dostoevsky',
    'William Shakespeare',
    'Charles Dickens',
    'George Orwell',
  ];
  return generateRandomArrayElement(writers);
};

const generateActors = () => {
  const actors = [
    'Fred Astaire, Humphrey Bogart',
    'Marlon Brando, Richard Burton',
    'Richard Burton, James Cagney',
  ];
  return generateRandomArrayElement(actors);
};

const generateCountry = () => {
  const countries = [
    'USA',
    'Russia',
    'Spain',
    'Italy',
    'Ireland',
  ];
  return generateRandomArrayElement(countries);
};

const ageRating = () => {
  const ratingParameters = [
    '0+',
    '6+',
    '12+',
    '18+',
  ];
  return generateRandomArrayElement(ratingParameters);
};

export const generateFilmMockInfo = () => ({
  id: nanoid(),
  poster: generateFilmPoster(),
  title:  generateFilmTitle(),
  director: generateDirector(),
  writers: generateWriters(),
  actors: generateActors(),
  age: ageRating(),
  alternativeTitle: generateFilmTitle(),
  rating: getRandomPositiveFloat(0,MAX_RATING_VALUE),
  productionYear: dayjs().year(getRandomInteger(MIN_FILM_YEAR, MAX_FILM_YEAR)).format('YYYY'),
  duration: generateFixDurationTime(getRandomInteger(MIN_FILM_DURATION_VALUE, MAX_FILM_DURATION_VALUE)),
  genre: generateGenre(),
  description: generateDescription(),
  country: generateCountry(),
  numOfComments: getRandomInteger(0, MAX_COMMENT_VALUE),
  isWatchList: Boolean(getRandomInteger(0, 1)),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorites: Boolean(getRandomInteger(0, 1)),
  popupIsWatchList: Boolean(getRandomInteger(0, 1)),
  popupIsWatched: Boolean(getRandomInteger(0, 1)),
  popupIsFavorites: Boolean(getRandomInteger(0, 1)),
  releaseDate: dayjs().year(getRandomInteger(MIN_FILM_YEAR, MAX_FILM_YEAR)).day(getRandomInteger(1, LAST_MONTH_DAY)).format('DD MMM YYYY'),
});


