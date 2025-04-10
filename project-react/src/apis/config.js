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
export const getMovies = (page = 1) =>
  api.get("/movie/now_playing", { params: { page } });
export const getMovieDetails = (id) => api.get(`/movie/${id}`);
export const getMovieRecommendations = (id) =>
  api.get(`/movie/${id}/recommendations`);
export const getMovieReviews = (id) => api.get(`/movie/${id}/reviews`);
export const searchMovies = (query) =>
  api.get("/search/movie", { params: { query } });

// TV
export const getTVShows = (page = 1) =>
  api.get("/tv/popular", { params: { page } });
export const getTVDetails = (id) => api.get(`/tv/${id}`);
export const getTVRecommendations = (id) =>
  api.get(`/tv/${id}/recommendations`);
export const getTVReviews = (id) => api.get(`/tv/${id}/reviews`);
export const searchTVShows = (query) =>
  api.get("/search/tv", { params: { query } });

export default api;
