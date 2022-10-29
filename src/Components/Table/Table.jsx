import React, { useState, useEffect } from "react";
import Links, { MovieDBLinks } from "../../Variables";
import { NavLink } from "react-router-dom";

import TableCSS from "../Table/Table.module.scss";

export function Table(props) {
  const { films, page, setPage } = props;
  return (
    <div className={TableCSS.Table}>
      <table className={TableCSS.Table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Picture</th>
            <th>Title</th>
            <th>Year</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film, index) => {
            return (
              <tr key={film.id}>
                <td>{index + 1 + (page - 1) * films.length}</td>
                <td className={TableCSS.imageCell}>
                  <img
                    className={TableCSS.MoviePoster}
                    src={MovieDBLinks.image + film.poster_path}
                    alt={index}
                  />
                </td>
                <td>
                  <NavLink to={`/movie/${film.id}`} className={TableCSS.Link}>
                    {film.original_title}
                  </NavLink>{" "}
                </td>
                <td>{film.release_date.slice(0, 4)}</td>
                <td>{film.vote_average}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className={TableCSS.Pages}>
        <button
          className={TableCSS.PageButton}
          onClick={() => (page > 1 ? setPage(page - 1) : null)}
        >
          prev
        </button>
        <button
          className={TableCSS.PageButton}
          onClick={() => setPage(page + 1)}
        >
          next
        </button>
      </div>
    </div>
  );
}
