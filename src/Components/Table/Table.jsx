import React, { useState, useEffect } from "react";
import { MovieDBLinks } from "../../Variables";
import { NavLink, useParams } from "react-router-dom";

import TableCSS from "../Table/Table.module.scss";

export function Table(props) {
  // films is an array of objects (films)
  // page is the current page number
  // url created for the search page provide here the searchValue
  const { films, page, url } = props;
  if (page == NaN || page < 1 || page == undefined) {
    page = 1;
  }

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
                  {film.poster_path ?
                    <img
                      className={TableCSS.MoviePoster}
                      src={MovieDBLinks.image + film.poster_path}
                      alt={index}
                    /> :
                    <img className={TableCSS.MoviePoster} src={"/default_userpic.png"} alt={index} />
                  }
                </td>
                <td>
                  <NavLink to={`/movie/${film.id}`} className={TableCSS.Link}>
                    {film.original_title}
                  </NavLink>{" "}
                </td>
                <td>{film.release_date?.slice(0, 4)}</td>
                <td>{film.vote_average}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={TableCSS.Pages}>
        <NavLink
          className={TableCSS.PageButton}
          to={`/${url == "" ? "" : url + "/"}${Number(page) === 1 ? 1 : Number(page) - 1
            }`}
        >
          prev
        </NavLink>
        <NavLink
          className={TableCSS.PageButton}
          to={`/${url == "" ? "" : url + "/"}${Number(page) + 1
            }`}
        >
          next
        </NavLink>
      </div>
    </div>
  );
}
