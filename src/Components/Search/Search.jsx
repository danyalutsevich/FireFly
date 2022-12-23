import React, { useState, useEffect } from "react";
import { MovieDBLinks } from "../../Variables";
import { NavLink, useParams } from "react-router-dom";
import { addSearch } from "../../firebase-config";
import { Table } from "../Table"

import SearchCSS from "./Search.module.scss";

export function Search() {
  const [films, setFilms] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const { searchValue, page = 1 } = useParams();

  useEffect(() => {
    if (searchValue != "") {
      fetch(MovieDBLinks.search(searchValue, page))
        .then((data) => data.json())
        .then((data) => { setFilms(data.results); setTotalResults(data.total_results); console.log(data)});
      addSearch(searchValue);
      document.title = "Search: " + searchValue;
    }
  }, [page, searchValue]);


  return (
    <div className={SearchCSS.Search}>
      <div className={SearchCSS.SearchInfo}>
        <h1>Search results for
          <div className={SearchCSS.Divider}></div>
          <span className={SearchCSS.SearchValue}>{searchValue}</span>
        </h1>
        <h2>items
          <div className={SearchCSS.Divider2}></div>
          <span>{totalResults}</span>
        </h2>
      </div>
      <Table films={films} page={page} url={"search/" + searchValue}></Table>
    </div>
  );
}
