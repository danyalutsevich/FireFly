import React, { useState, useEffect } from "react";
import Links, { MovieDBLinks } from "../../Variables";
import { useParams } from "react-router-dom";

import { Loading } from "../Loading";
import { TopFilm } from "../TopFilm";
import { Table } from "../Table/Table";

import HomeCSS from "./Home.module.scss";
import TableCSS from "../Table/Table.module.scss";

export function Home() {
  const [films, setFilms] = useState([]);
  let page = useParams().page;
  if (page < 1 || page === undefined) {
    page = 1;
  }
  if (page > 63) {
    page = 63;
  }

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
      <Table films={films} page={page} url={"page"} />
    </div>
  );
}
