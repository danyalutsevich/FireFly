import React, { useState, useEffect } from "react";
import { MovieDBLinks } from "../../Variables";
import { NavLink } from "react-router-dom";

import RatingsCSS from "./Ratings.module.scss";

export function Ratings() {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(MovieDBLinks.top_rated(page))
      .then((data) => data.json())
      .then((data) => setFilms(data.results));
  }, [page]);

  if (films === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className={RatingsCSS.Ratings}>
      <div>
        <button onClick={() => (page > 1 ? setPage(page - 1) : null)}>
          {"<"}
        </button>
        <button onClick={() => setPage(page + 1)}>{">"}</button>
      </div>
      <table>
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
                <td>
                  <img
                    src={MovieDBLinks.image + film.poster_path}
                    alt={index}
                  ></img>
                </td>
                <td>
                  <NavLink to={`/movie/${film.id}`}>
                    {film.original_title}
                  </NavLink>
                </td>
                <td>{film.vote_average}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => (page > 1 ? setPage(page - 1) : null)}>
          {"<"}
        </button>
        <button onClick={() => setPage(page + 1)}>{">"}</button>
      </div>
    </div>
  );
}
