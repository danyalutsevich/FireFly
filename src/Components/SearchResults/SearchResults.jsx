import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { MovieDBLinks } from "../../Variables";

import SearchResultsCSS from "./SearchResults.module.scss";

export function SearchResults(props) {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch(MovieDBLinks.search(props.searchValue, 1))
      .then((data) => data.json())
      .then((data) => {
        setFilms(data.results.slice(0, 5));
      });
  });
  return (
    <div style={{display: props.searchValue === '' || props.isActive === false? 'none' : 'grid'}} className={SearchResultsCSS.SearchResults} >
      {films.map((film) => {
        return <NavLink to={`/movie/${film.id}`} key={film.title}>{film.title} <span>{film?.release_date?.slice(0, 4)}</span></NavLink>;
      })}
      <div className={SearchResultsCSS.Divider}></div>
      <NavLink to={props.searchValue === "" ? "#" : `/search/${props.searchValue}/1`}>
            Show all results...
          </NavLink>
    </div>
  );
}
