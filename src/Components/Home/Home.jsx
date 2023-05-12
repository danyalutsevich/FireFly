import React, { useState, useEffect } from "react";
import Links, { MovieDBLinks } from "../../Variables";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

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
    document.title = "Home"
  }, [page]);
  if (films.length === 0) {
    return <Loading />;
  }
  return (
    <div className={HomeCSS.Home}>
      <Helmet>
        <title>{"Home"}</title>

        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={"Home"} />
        <meta property="og:description" content={"This is home Page. You can find tranding movies here"} />
        <meta property="og:image" content="/logo512.png" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Firefly" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Home"} />
        <meta name="twitter:description" content={"This is home Page. You can find tranding movies here"} />
        <meta name="twitter:image" content={"/logo512.png"} />

        <meta name="description" content={"This is home Page. You can find tranding movies here"} />
      </Helmet>
      <TopFilm film={films[0]} />
      <Table films={films} page={page} url={"home"} media_type={"movie"} />
    </div>
  );
}
