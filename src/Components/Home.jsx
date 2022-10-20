import React, { useState, useEffect } from "react";
import Links, { MovieDBLinks } from "./Variables";
import "./Home.css";
import Loading from "./Loading.jsx";
import TopFilm from "./TopFilm";

export default function Home() {
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
    <div className="Ratings">
      <TopFilm film={films[0]} />
      <table className="Table">
        <tbody>
          {films.map((film, index) => {
            return (
              <tr key={film.id}>
                <td className="imageCell">
                  <img
                    className="imageFilm"
                    src={MovieDBLinks.image + film.poster_path}
                    alt={index}
                  />
                </td>
                <td>{film.original_title}</td>
                <td>{film.release_date.slice(0, 4)}</td>
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
