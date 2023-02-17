import React, { useState, useEffect } from "react";
import { MovieDBLinks } from "../../Variables";
import { NavLink, useParams } from "react-router-dom";
import { Loading } from "../Loading";
import { Table } from "../Table";
import RatingsCSS from "./Ratings.module.scss";

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
    <Table url={"ratings"} page={page} films={films} media_type={"movie"} />
  )
}
