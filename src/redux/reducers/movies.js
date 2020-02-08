import { get } from "lodash";
import {
  LOAD_VIDEOS,
  LOAD_VIDEOS_SUCCESS,
  LOAD_VIDEOS_FAILURE,
  SELECT_CATEGORY,
  SELECT_MOVIE,
  SELECT_OVERVIEW,
  SELECT_ACTION
} from "../types";

const initialState = {
  loading: false,
  results: [],
  categories: [],
  overviewMovie: undefined,
  selectedCategory: undefined,
  selectedMovie: undefined,
  selectedAction: 0
};

const getCategories = results => {
  const genres = results.reduce((acc, value) => {
    const genres = value.genre_ids;
    genres.forEach(el => {
      acc.add(el);
    });
    return acc;
  }, new Set());
  return Array.from(genres);
};

export const moviesReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case LOAD_VIDEOS: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_VIDEOS_SUCCESS: {
      const results = payload.results;
      const categories = getCategories(results);
      return {
        ...state,
        results,
        categories,
        selectedCategory: categories[0],
        loading: false
      };
    }
    case LOAD_VIDEOS_FAILURE: {
      return {
        ...state,
        loading: false,
        // Handle the error message usually
        // This case only hardcoded message
        error: "Download failure"
      };
    }
    case SELECT_CATEGORY: {
      return {
        ...state,
        selectedCategory: payload
      };
    }
    case SELECT_MOVIE: {
      return {
        ...state,
        selectedMovie: payload
      };
    }
    case SELECT_OVERVIEW: {
      return {
        ...state,
        overviewMovie: payload
      };
    }

    case SELECT_ACTION: {
      return {
        ...state,
        selectedAction: payload
      };
    }
    default: {
      return state;
    }
  }
};
