export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomPositiveFloat = (int1, int2, digits = 1) => {
  const lower = Math.min(Math.abs(int1), Math.abs(int2));
  const upper = Math.max(Math.abs(int1), Math.abs(int2));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};

export  const generateFixDurationTime = (totalMinutes) => {

  let hours = Math.floor( totalMinutes  / 60);
  let mins =  Math.floor(totalMinutes - (hours * 60));
  hours = hours ? `${hours}h `: '';
  mins = mins ? `${mins}m` : '';

  return hours + mins;
};

export const generateRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

export const  formatNumberWithSpaces = (num) =>  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const isEscapeEvent = (evt) =>
{
  const result = Boolean(evt.key === 'Escape');
  return result;
};

export const isEscEvent = (evt) =>
{
  const result =  Boolean (evt.key === 'Esc');
  return result;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const sortFilmsByDate =  (a, b) =>  (a.productionYear < b.productionYear) ? 1 : -1;

export const sortFilmsByRating = (a, b) => (a.rating < b.rating) ? 1: -1;
