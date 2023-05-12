import React, { useState, useEffect } from "react";
import { MovieDBLinks } from "../../Variables";
import { NavLink, useParams } from "react-router-dom";
import { Loading } from "../Loading";
import { Table } from "../Table";
import RatingsCSS from "./Ratings.module.scss";
import { Helmet } from "react-helmet";

export function Ratings() {
  const [films, setFilms] = useState([]);
  const page = useParams().page;

  useEffect(() => {
    fetch(MovieDBLinks.top_rated(page))
      .then((data) => data.json())
      .then((data) => setFilms(data.results));
    document.title = "Ratings"
    document.querySelector('meta[name="description"]').setAttribute("content", `Here you can find top rated films`)
    document.querySelector('meta[property="og:description"]').setAttribute("content", `Here you can find top rated films`)
    document.querySelector('meta[property="og:title"]').setAttribute("content", "Ratings")
  }, [page]);

  if (films.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <Helmet>
        <title>{`Ratings (${page})`}</title>

        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={`Ratings (${page})`} />
        <meta property="og:description" content={`Here you can find top rated movied`} />
        <meta property="og:image" content="/logo512.png" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Firefly" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Ratings, page ${page}`} />
        <meta name="twitter:description" content={`Here you can find top rated movied`} />
        <meta name="twitter:image" content={"/logo512.png"} />

        <meta name="description" content={`Here you can find top rated movied`} />
      </Helmet>
      <Table url={"ratings"} page={page} films={films} media_type={"movie"} />
    </div>
  )
}
