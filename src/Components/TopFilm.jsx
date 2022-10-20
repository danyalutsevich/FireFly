import React from "react";
import Links, { MovieDBLinks } from "./Variables";
import "./TopFilm.css";

export default function TopFilm(props) {
  const { film } = props;

  return (
    <div className="TopFilm">
      <div className="TopFilmInfo">
        <img
          className="MoviePoster"
          src={MovieDBLinks.image + film.poster_path}
          alt="movie poster"
        ></img>
        <h1></h1>
        <h1>
          {film.original_title} ({film.release_date.slice(0, 4)})
        </h1>
        <p>Description: {film.overview}</p>
        <p>
          <br />
          FireFly Rating: {film.vote_average}
        </p>
      </div>
    </div>
  );
}
