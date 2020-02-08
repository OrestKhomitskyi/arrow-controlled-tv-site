import React, { useEffect } from "react";

import { connect } from "react-redux";
import "./categories.sass";

import { loadMovies } from "../../redux/actions";

const Categories = ({ loadMovies, categories, selectedCategory }) => {
  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return (
    <div className="categories">
      <span className="header">Filmer</span>
      <ul className="category-list">
        {categories.map(category => (
          <li
            className={category === selectedCategory && "selected"}
            key={category}
          >
            {category}

            {category === selectedCategory && (
              <img src="/arrow-right.png" width={12} height="12" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
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

export default connect(
  ({ moviesReducer }) => ({
    categories: getCategories(moviesReducer.results),
    selectedCategory: moviesReducer.selectedCategory
  }),
  { loadMovies }
)(Categories);
