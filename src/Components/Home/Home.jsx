import React, { useState, useEffect } from "react";
import Links, { MovieDBLinks } from "../../Variables";
import { NavLink } from "react-router-dom";

import {Loading} from "../Loading";
import {TopFilm} from "../TopFilm";

import HomeCSS from "./Home.module.scss";

export function Home() {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(MovieDBLinks.top_rated(page))
      .then((data) => data.json())
      .then((data) => setFilms(data.results));

    console.log(JSON.stringify(films[0]));
  }, [page]);

  if (films.length === 0) {
    return <Loading />;
  }

  return (
    <div className={HomeCSS.Ratings}>

      <TopFilm film={films[0]} />

      <table className={HomeCSS.Table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Picture</th>
            <th>Title</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film, index) => {
            return (
              <tr key={film.id}>
                <td>{index + 1 + (page - 1) * films.length}</td>
                <td className={HomeCSS.imageCell}>
                  <img
                    className={HomeCSS.MoviePoster}
                    src={MovieDBLinks.image + film.poster_path}
                    alt={index}
                  />
                </td>
                <td>{film.original_title}</td>
                <td>{film.vote_average}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => (page > 1 ? setPage(page - 1) : null)}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
