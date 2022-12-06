import React, { useState } from "react";
import Links, { MovieDBLinks } from "../../Variables";
import TopFilmCSS from "./TopFilm.module.scss";
import { NavLink } from "react-router-dom";

export function TopFilm(props) {
  const { film } = props;

  const [isMore, setIsMore] = useState(false);

  return (
    <div className={TopFilmCSS.TopFilm}>
      <img
        className={TopFilmCSS.MoviePoster}
        src={MovieDBLinks.image + film.poster_path}
        alt={film.original_title + " poster"}
        srcSet={MovieDBLinks.image_original + film.poster_path}
        onClick={() => {
          window.location.href= "/movie/" + film.id;
        }
        }
      ></img>
      <div className={TopFilmCSS.TopFilmInfo}>
        <NavLink to={`/movie/${film.id}`} className={TopFilmCSS.Link}>
          {film.original_title} ({film.release_date.slice(0, 4)})
        </NavLink>
        <p>
          {isMore ? film.overview : film.overview.slice(0, 100)}
          <button
            type="button"
            onClick={() => {
              setIsMore(!isMore);
            }}
          >
            {isMore ? "Hide" : "..."}
          </button>
        </p>
        <p>Rating: {film.vote_average}</p>
      </div>
    </div>
  );
}
