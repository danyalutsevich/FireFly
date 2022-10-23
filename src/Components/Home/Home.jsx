import React, { useState, useEffect } from "react";
import Links, { MovieDBLinks } from "../../Variables";
import { NavLink } from "react-router-dom";

import { Loading } from "../Loading";
import { TopFilm } from "../TopFilm";
import { Footer } from "../Footer/Footer";

import HomeCSS from "./Home.module.scss";

export function Home() {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(MovieDBLinks.top_rated(page))
      .then((data) => data.json())
      .then((data) => setFilms(data.results));
  }, [page]);

  if (films.length === 0) {
    return <Loading />;
  }

  return (
    <div className={HomeCSS.Home}>
      <TopFilm film={films[0]} />


      <table className={HomeCSS.Table}>
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
                <td className={HomeCSS.imageCell}>
                  <img
                    className={HomeCSS.MoviePoster}
                    src={MovieDBLinks.image + film.poster_path}
                    alt={index}
                  />
                </td>
                <td>
                  <NavLink to={`/movie/${film.id}`} className={HomeCSS.Link}>
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
      <div className="pages">
        <button
          className="prevButton prevButtonWhite prevButtonAnimate"
          onClick={() => (page > 1 ? setPage(page - 1) : null)}
        >
          prev
        </button>
        <button
          className="nextButton nextButtonWhite nextButtonAnimate"
          onClick={() => setPage(page + 1)}
        >
          next
        </button>
      </div>
    </div>
  );
}
