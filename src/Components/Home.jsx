import React, { useState, useEffect } from "react";
import Links, { MovieDBLinks } from "./Variables";
import "./Home.css";
import Loading from "./Loading.jsx";

export default function Home() {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(MovieDBLinks.top_rated(page))
      .then((data) => data.json())
      .then((data) => setFilms(data.results));
  }, [page]);

  if (films === undefined) {
    return <Loading />;
  }

  return (
    <div className="Ratings">
      <a href="/error404">Top Rated</a>

      <div className="TopFilm">
        <img
          className="MoviePoster"
          src={MovieDBLinks.image + films[0].poster_path}
          alt="movie poster"
        ></img>
        <div className="TopFilmInfo">
          <h1>{films[0].original_title}</h1>
          <p>{films[0].overview}</p>
        </div>
      </div>

      <table className="Table">
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
                <td className="imageCell">
                  <img
                    className="MoviePoster"
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
