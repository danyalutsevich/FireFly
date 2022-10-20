import React from "react";
import Links, { MovieDBLinks } from "./Variables";
import "./TopFilm.css";

export default function TopFilm(props) {
  const { film } = props;

  return (
    <div className="TopFilm">
      <img
        className="MoviePoster"
        src={MovieDBLinks.image + film.poster_path}
        alt="movie poster"
      ></img>
      <div className="TopFilmInfo">
        <h1>{film.original_title}</h1>
        <p>{film.overview}</p>
      </div>
    </div>
  );
}
