import React from "react";
import Links, { MovieDBLinks } from "./Variables";
import TopFilmCSS from "./TopFilm.module.css";

export default function TopFilm(props) {
  const { film } = props;

  return (
    <div className={TopFilmCSS.TopFilm}>
      <img
        className={TopFilmCSS.MoviePoster}
        src={MovieDBLinks.image + film.poster_path}
        alt="movie poster"
      ></img>
      <div className={TopFilmCSS.TopFilmInfo}>
        <h1>{film.original_title}</h1>
        <p>{film.overview}</p>
      </div>
    </div>
  );
}
