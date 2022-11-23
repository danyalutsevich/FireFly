import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { MovieDBLinks } from "../../Variables";
import { FirebaseContext } from "../../firebase-config";
import SearchResultsCSS from "./SearchResults.module.scss";

export function SearchResults(props) {
  const [films, setFilms] = useState([]);

  const { searches } = useContext(FirebaseContext);

  console.log(searches)

  useEffect(() => {
    fetch(MovieDBLinks.search(props.searchValue, 1))
      .then((data) => data.json())
      .then((data) => {
        setFilms(data.results.slice(0, 5));
      });
  });
  return (
    <div style={{ display: props.isActive === false ? 'none' : 'grid' }} className={SearchResultsCSS.SearchResults} >
      {props.searchValue === '' ?
        searches?.slice(0, 5).map((search) => {
          return (
            <NavLink to={"/search/" + search + "/1"} className={SearchResultsCSS.SearchResult}>
              <div className={SearchResultsCSS.SearchResultText}>
                {search}
                
              </div>
            </NavLink>
          )
        })
        :
        films.map((film) => {
          return <NavLink to={`/movie/${film.id}`} key={film.title}>{film.title} <span>{film?.release_date?.slice(0, 4)}</span></NavLink>;
        })}
      <div className={SearchResultsCSS.Divider}></div>
      <NavLink to={props.searchValue === "" ? "#" : `/search/${props.searchValue}/1`}>
        Show all results...
      </NavLink>
    </div>
  );
}
