import React, {useState, useEffect} from 'react';
import {MovieDBLinks} from '../../Variables';

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
  <div>
    <div className={LikedCSS.LikedHeader}>
      <h2 className={LikedCSS.PageTitle}>Liked</h2>
      <div className={LikedCSS.Sort}>
        
        <button className={LikedCSS.SortIconBtn}>
          <p className={LikedCSS.SortElement}>{sortMethod}<i className="material-icons">{icon}</i></p>
          <i className={`material-icons ${LikedCSS.SortIcon}`}>sort</i>
        </button>
        <div className={LikedCSS.DropdownSortMethods}>
          <button className={LikedCSS.SortMethodElement} onClick={() => {setSortMethod("by date added"); setIcon("arrow_upward")}}>by date added<i className="material-icons">arrow_upward</i></button>
          <button className={LikedCSS.SortMethodElement} onClick={() => {setSortMethod("by date added"); setIcon("arrow_downward")}}>by date added<i className="material-icons">arrow_downward</i></button>
          <button className={LikedCSS.SortMethodElement} onClick={() => {setSortMethod("by rating"); setIcon("arrow_upward")}}>by rating<i className="material-icons">arrow_upward</i></button>
          <button className={LikedCSS.SortMethodElement} onClick={() => {setSortMethod("by rating"); setIcon("arrow_downward")}}>by rating<i className="material-icons">arrow_downward</i></button>

        </div>
      </div>
    </div>
    <div className={LikedCSS.Divider}></div>
    <div className={LikedCSS["liked-content"]}>
    {
      likedFilms.map((item) => {
        return(
        <LikedContentCard key = {item.id} imgSrc = {MovieDBLinks.image + item.poster_path}/>
        )
      })
    }
    </div>

  </div>
  );
}