import React, { useState, useEffect } from "react";
import Links, { MovieDBLinks } from "../../Variables";

import { Loading } from "../Loading";
import { TopFilm } from "../TopFilm";
import { Table } from "../Table/Table";

import HomeCSS from "./Home.module.scss";
import TableCSS from "../Table/Table.module.scss";

export function Home() {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetch(MovieDBLinks.popular(page))
      .then((data) => data.json())
      .then((data) => setFilms(data.results));
  }, [page]);
  if (films.length === 0) {
    return <Loading />;
  }
  return (
    <div className={HomeCSS.Home}>
      <TopFilm film={films[0]} />
      <Table films={films} page={page} />
      <div className="pages">
        <button
          className="buttonPage"
          onClick={() => (page > 1 ? setPage(page - 1) : null)}
        >
          prev
        </button>
        <button className="buttonPage" onClick={() => setPage(page + 1)}>
          next
        </button>
      </div>
    </div>
  );
}
