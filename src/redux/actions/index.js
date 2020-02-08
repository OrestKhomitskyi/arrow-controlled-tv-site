import { get, findIndex } from "lodash";
import { getVideosState } from "../../api/videos";
import {
  LOAD_VIDEOS_SUCCESS,
  LOAD_VIDEOS_FAILURE,
  SELECT_CATEGORY,
  SELECT_MOVIE,
  SELECT_OVERVIEW,
  SELECT_ACTION
} from "../types";

export const loadMovies = () => dispatch => {
  getVideosState()
    .then(r => {
      dispatch({
        type: LOAD_VIDEOS_SUCCESS,
        payload: r.data
      });
    })
    .catch(() => {
      dispatch({
        type: LOAD_VIDEOS_FAILURE
      });
    });
};

const keys = [
  "ArrowUp",
  "ArrowDown",
  "ArrowRight",
  "ArrowLeft",
  "Enter",
  "KeyB"
];

// here we are going to solve what category or movie should be selected
export const handlePressKey = (code, columns) => (dispatch, getState) => {
  // If a wrong key do nothing
  if (!keys.includes(code)) return null;
  const state = getState();
  const categories = get(state, "moviesReducer.categories");
  let overviewMovie = get(state, "moviesReducer.overviewMovie");
  let currentCategory = get(state, "moviesReducer.selectedCategory");
  let currentAction = get(state, "moviesReducer.selectedAction");

  const movies = get(state, "moviesReducer.results").filter(el =>
    el.genre_ids.includes(currentCategory)
  );

  let currentMovie = get(state, "moviesReducer.selectedMovie");

  // Navigating only categories or move to movie
  if (!currentMovie) {
    const currentIndex = categories.indexOf(currentCategory);
    // check if down
    if (code === keys[1]) {
      currentCategory = categories[(currentIndex + 1) % categories.length];
    }
    if (code === keys[0]) {
      currentCategory =
        categories[
          currentIndex - 1 < 0 ? categories.length - 1 : currentIndex - 1
        ];
    }

    if (code === keys[2]) {
      dispatch({
        type: SELECT_MOVIE,
        payload: movies[0]
      });
    } else
      dispatch({
        type: SELECT_CATEGORY,
        payload: currentCategory
      });
    return;
  }

  if (overviewMovie) {
    if (code === keys[3]) {
      currentAction = currentAction - 1 < 0 ? 2 : currentAction - 1;
    }
    if (code === keys[2]) {
      currentAction = (currentAction + 1) % 3;
    }
    if (code === keys[5]) {
      currentAction = 0;
      overviewMovie = undefined;
    }

    dispatch({
      type: SELECT_OVERVIEW,
      payload: overviewMovie
    });
    dispatch({
      type: SELECT_ACTION,
      payload: currentAction
    });
    return;
  }

  if (currentMovie && !overviewMovie) {
    const currentMovieIndex = findIndex(
      movies,
      el => currentMovie.id === el.id
    );

    if (code === keys[5]) {
      currentMovie = undefined;
    }

    if (code === keys[2]) {
      const index =
        currentMovieIndex < movies.length - 1
          ? currentMovieIndex + 1
          : currentMovieIndex;
      currentMovie = { ...movies[index] };
    }

    if (code === keys[3]) {
      currentMovie =
        currentMovieIndex - 1 >= 0 ? movies[currentMovieIndex - 1] : undefined;
    }

    if (code === keys[1]) {
      const index = currentMovieIndex + columns;
      currentMovie = movies[index < movies.length ? index : currentMovieIndex];
    }

    if (code === keys[0]) {
      const index = currentMovieIndex - columns;
      currentMovie = movies[index >= 0 ? index : currentMovieIndex];
    }

    if (code === keys[4]) {
      overviewMovie = { ...currentMovie };
    }

    if (code === keys[5]) {
      overviewMovie = undefined;
    }

    dispatch({
      type: SELECT_OVERVIEW,
      payload: overviewMovie
    });

    dispatch({
      type: SELECT_MOVIE,
      payload: currentMovie
    });
    return;
  }
};
