import React, {useState, useEffect} from 'react';
import {MovieDBLinks} from '../../Variables';
import { NavLink } from "react-router-dom";

import LikedCSS from "./Liked.module.scss";

import {LikedContentCard} from "../LikedContentCard";

export function Liked() {
  const [sortMethod, setSortMethod] = useState("by date added")
  const [icon, setIcon] = useState("arrow_upward")

  const [likedFilms, setLikedFilms] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(MovieDBLinks.top_rated(page)).then(data => data.json()).then(data => setLikedFilms(data.results))
    console.log(LikedCSS)
  }, [page])

  if (likedFilms.length === 0) {
    return (<div>Loading...</div>)
  }

  return (
  <div className={LikedCSS.Liked}>
    <div className={LikedCSS.Header}>
      <h2>Liked</h2>
      <div className={LikedCSS.Sort}>
        
        <button className={LikedCSS.SortBtn}>
          <span>{sortMethod}<i className="material-icons">{icon}</i></span>
          <i className={`material-icons ${LikedCSS.SortIcon}`}>sort</i>
        </button>
        <div>
          <button onClick={() => {setSortMethod("by date added"); setIcon("arrow_upward")}}>by date added<i className="material-icons">arrow_upward</i></button>
          <button onClick={() => {setSortMethod("by date added"); setIcon("arrow_downward")}}>by date added<i className="material-icons">arrow_downward</i></button>
          <button onClick={() => {setSortMethod("by rating"); setIcon("arrow_upward")}}>by rating<i className="material-icons">arrow_upward</i></button>
          <button onClick={() => {setSortMethod("by rating"); setIcon("arrow_downward")}}>by rating<i className="material-icons">arrow_downward</i></button>

        </div>
      </div>
    </div>
    <div className={LikedCSS.Divider}></div>
    <div className={LikedCSS["Liked-content"]}>
    {
      likedFilms.map((item) => {
        return(
          <NavLink to={`/movie/${item.id}`}>
            <LikedContentCard key = {item.id} imgSrc = {MovieDBLinks.image + item.poster_path}/>
          </NavLink>
        )
      })
    }
    </div>

  </div>
  );
}