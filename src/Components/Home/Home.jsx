import React, { useState, useEffect } from "react";
import Links, { MovieDBLinks } from "../../Variables";
import { useParams, useQueryParams } from "react-router-dom";

import { Loading } from "../Loading";
import { TopFilm } from "../TopFilm";
import { Table } from "../Table/Table";

import HomeCSS from "./Home.module.scss";
import TableCSS from "../Table/Table.module.scss";

export function Home() {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  let Page = useParams().page;
  console.log(useParams());
  if (Page < 1 || Page === undefined) {
    Page = 1;
  }
  if (Page > 63) {
    Page = 63;
  }

  useEffect(() => {
    fetch(MovieDBLinks.popular(Page))
      .then((data) => data.json())
      .then((data) => setFilms(data.results));
  }, [Page]);
  if (films.length === 0) {
    return <Loading />;
  }
  return (
    <div className={HomeCSS.Home}>
      <TopFilm film={films[0]} />
      <Table films={films} page={Page} setPage={setPage} url={""} />
    </div>
  );
}
