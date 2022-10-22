import React from "react";
import Links, { MovieDBLinks } from "../../Variables";
import TopFilmCSS from "./TopFilm.module.scss";

export function TopFilm(props) {
  const { film } = props;

  return (
    <div className={TopFilmCSS.TopFilm}>
      <img
        className={TopFilmCSS.MoviePoster}
        src={MovieDBLinks.image + film.poster_path}
        alt="movie poster"
      ></img>
      <div className={TopFilmCSS.TopFilmInfo}>
        <h1>
          {film.original_title} ({film.release_date.slice(0, 4)})
        </h1>
        <p>Description: {film.overview}</p>
        <p>FireFly rating: {film.vote_average}</p>
      </div>
    </div>
  );
}
