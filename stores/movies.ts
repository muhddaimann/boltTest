import { create } from 'zustand';
import axios from 'axios';

const TMDB_ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

interface MoviesState {
  trending: Movie[];
  searchResults: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: string | null;
  fetchTrending: () => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
  getMovieDetails: (id: number) => Promise<void>;
}

export const useMoviesStore = create<MoviesState>((set) => ({
  trending: [],
  searchResults: [],
  selectedMovie: null,
  loading: false,
  error: null,

  fetchTrending: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      set({ trending: response.data.results, loading: false });
    } catch (error: any) {
      console.error("Error fetching trending movies:", error.response?.data || error.message);
      set({ error: error.response?.data?.status_message || "Failed to fetch trending movies", loading: false });
    }
  },

  searchMovies: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }

    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        params: { query },
      });
      set({ searchResults: response.data.results, loading: false });
    } catch (error: any) {
      console.error("Error searching movies:", error.response?.data || error.message);
      set({ error: error.response?.data?.status_message || "Failed to search movies", loading: false });
    }
  },

  getMovieDetails: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      set({ selectedMovie: response.data, loading: false });
    } catch (error: any) {
      console.error("Error fetching movie details:", error.response?.data || error.message);
      set({ error: error.response?.data?.status_message || "Failed to fetch movie details", loading: false });
    }
  },
}));
