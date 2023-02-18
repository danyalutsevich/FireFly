import React, { useState, useEffect } from "react";
import { MovieDBLinks } from "../../Variables";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
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
    }
  }, [page, searchValue]);


  return (
    <div className={SearchCSS.Search}>
       <Helmet>
        <title>{ "Search: " + searchValue}</title>

        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={"Search: " + searchValue} />
        <meta property="og:description" content={`Search results for: ${searchValue} Total Results: ${totalResults}`} />
        <meta property="og:image" content="/logo512.png" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Firefly" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Search: " + searchValue} />
        <meta name="twitter:description" content={`Search results for: ${searchValue} Total Results: ${totalResults}`} />
        <meta name="twitter:image" content={"/logo512.png"} />

        <meta name="description" content={`Search results for: ${searchValue} Total Results: ${totalResults}`} />
      </Helmet>
      <div className={SearchCSS.SearchInfo}>
        <h2>Search results for
          <div className={SearchCSS.Divider}></div>
          <span className={SearchCSS.SearchValue}>{searchValue}</span>
        </h2>
        <h2>items
          <div className={SearchCSS.Divider2}></div>
          <span>{totalResults}</span>
        </h2>
      </div>
      <Table films={films} page={page} url={"search/" + searchValue}></Table>
    </div>
  );
}
