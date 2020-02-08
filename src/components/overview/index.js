import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faEye, faBookmark } from "@fortawesome/free-solid-svg-icons";

import "./overview.sass";

const Overview = ({ overviewMovie, selectedAction }) => {
  return (
    <div className={`overview-container ${overviewMovie && "active"}`}>
      {overviewMovie && (
        <>
          <div className="title">
            {overviewMovie.title +
              ` (${moment(overviewMovie.release_date).format("YYYY")})`}
          </div>
          <div className="movie-info">
            <div className="poster">
              <div className="movie-characteristics">
                <div className="ch">
                  <div className="key">LENGDE</div>
                  <div className="value">1 time 23 min</div>
                </div>
                <div className="ch">
                  <div className="key">Land</div>
                  <div className="value">USA</div>
                </div>
                <div className="ch">
                  <div className="key">Speak</div>
                  <div className="value">{overviewMovie.original_language}</div>
                </div>
              </div>
              <img src={overviewMovie.poster_path} alt="poster path" />
              <div className="action-buttons">
                <button className={`btn ${selectedAction === 0 && "selected"}`}>
                  <FontAwesomeIcon size={"xs"} icon={faPlay} />
                  Sena
                </button>
                <button className={`btn ${selectedAction === 1 && "selected"}`}>
                  <FontAwesomeIcon size={"xs"} icon={faEye} />
                  Trailer
                </button>
                <button className={`btn ${selectedAction === 2 && "selected"}`}>
                  <FontAwesomeIcon size={"xs"} icon={faBookmark} />
                  Huskeliste
                </button>
              </div>
            </div>
            <div className="description">{overviewMovie.overview}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default connect(({ moviesReducer }) => ({
  overviewMovie: moviesReducer.overviewMovie,
  selectedAction: moviesReducer.selectedAction
}))(Overview);
