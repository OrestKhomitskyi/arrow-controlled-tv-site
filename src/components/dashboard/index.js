import React from "react";
import { connect } from "react-redux";
import Categories from "../categories";
import Movies from "../movies";

const Dashboard = ({ overviewMovie }) => {
  return (
    <div className={`app ${overviewMovie && "active"}`}>
      <Categories />
      <Movies />
    </div>
  );
};

export default connect(({ moviesReducer }) => ({
  overviewMovie: moviesReducer.overviewMovie
}))(Dashboard);
