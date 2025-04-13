// 8d55b3c5898c69cfdf5ddb259740171b
import axios from "axios";

const API_KEY = "8d55b3c5898c69cfdf5ddb259740171b";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

api.interceptors.request.use((config) => {
  return config;
});

// Movies
const getMovies = (page = 1) =>
  api.get("/movie/now_playing", { params: { page } });

const getMovieDetails = (id) => api.get(`/movie/${id}`);

const getMovieRecommendations = (id) => api.get(`/movie/${id}/recommendations`);

const getMovieReviews = (id) => api.get(`/movie/${id}/reviews`);

const searchMovies = (query) => api.get("/search/movie", { params: { query } });

// TV
const getTVShows = (page = 1) => api.get("/tv/popular", { params: { page } });

const getTVDetails = (id) => api.get(`/tv/${id}`);

const getTVRecommendations = (id) => api.get(`/tv/${id}/recommendations`);

const getTVReviews = (id) => api.get(`/tv/${id}/reviews`);

const searchTVShows = (query) => api.get("/search/tv", { params: { query } });

export {
  getMovies,
  getMovieDetails,
  getMovieRecommendations,
  getMovieReviews,
  searchMovies,
  // tv
  getTVShows,
  getTVDetails,
  getTVRecommendations,
  getTVReviews,
  searchTVShows,
};
export default api;
