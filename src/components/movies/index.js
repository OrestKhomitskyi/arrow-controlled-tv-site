import React, { useEffect } from "react";

import { connect } from "react-redux";

import { handlePressKey } from "../../redux/actions";

import "./movies.sass";

const Movies = ({ movies, selectedMovie, handlePressKey }) => {
  useEffect(() => {
    const onKeyPress = e => {
      // Care of adaptivity and get amount of columns
      const columnsCount = 5;
      handlePressKey(e.code, columnsCount);
    };

    document.addEventListener("keydown", onKeyPress);
    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, [handlePressKey]);

  if (!movies) return null;
  return (
    <div className="movies-grid">
      {movies.map(el => (
        <div
          className={`movie-preview ${selectedMovie &&
            el.id === selectedMovie.id &&
            "selected"}`}
          key={el.id}
        >
          <img src={el.poster_path} alt={el.id + "-image"} />
        </div>
      ))}
    </div>
  );
};

export default connect(
  ({ moviesReducer }) => ({
    movies: moviesReducer.results.filter(el =>
      el.genre_ids.includes(moviesReducer.selectedCategory)
    ),
    selectedMovie: moviesReducer.selectedMovie
  }),
  { handlePressKey }
)(Movies);
