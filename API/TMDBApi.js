// API/TMDBApi.js
const API_TOKEN = "df9408f95cf065827c94e06dafed3cd6";

export function getFilmsFromApiWithSearchedText(text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getImageFromApi(name) {
  return 'https://image.tmdb.org/t/p/w300' + name;
}

export function getCinemasForFilmFromApi(filmId, city) {
  const url = `https://api.themoviedb.org/3/movie/${filmId}/cinemas?api_key=${API_TOKEN}&language=fr&city=${city}`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getFilmTrailerFromApi(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_TOKEN}&language=fr`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
