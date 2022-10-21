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

    console.log(JSON.stringify(films[0]));
  }, [page]);

  if (films.length === 0) {
    return <Loading />;
  }

  return (
    <div className="Ratings">
      <a href="/error404">Top Rated</a>

    <TopFilm film = {films[0]}/>

      {/* {films.map((film, index) => {
        return index == 0 ? (
          <div className="TopFilm">
            <img
              className="MoviePoster"
              src={MovieDBLinks.image + film.poster_path}
              alt="movie poster"
            ></img>
            <div className="TopFilmInfo">
              <h1>{film.original_title}</h1>
              <p>{film.overview}</p>
            </div>
          </div>
        ) : null;
      })} */}
      
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
