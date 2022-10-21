import React, {useState, useEffect} from 'react';
import Links,{MovieDBLinks} from './Variables';

import "./Liked.css";

import LikedContentCard from "./Liked/LikedContentCard";

export default function Liked() {
  const [sortMethod, setSortMethod] = useState("by date added")
  const [icon, setIcon] = useState("arrow_upward")

  const [likedFilms, setLikedFilms] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(MovieDBLinks.top_rated(page)).then(data => data.json()).then(data => setLikedFilms(data.results))
  }, [page])

  if (likedFilms.length == 0) {
    return (<div>Loading...</div>)
  }

  return (
  <div>
    <div className="LikedHeader">
      <h2 className="PageTitle">Liked</h2>
      <div className="Sort">
        
        <button className="SortIconBtn">
          <p className="SortElement">{sortMethod}<i class="material-icons">{icon}</i></p>
          <i class="material-icons SortIcon">sort</i>
        </button>
        <div className="DropdownSortMethods">
          <button className="SortMethodElement" onClick={() => {setSortMethod("by date added"); setIcon("arrow_upward")}}>by date added<i class="material-icons">arrow_upward</i></button>
          <button className="SortMethodElement" onClick={() => {setSortMethod("by date added"); setIcon("arrow_downward")}}>by date added<i class="material-icons">arrow_downward</i></button>
          <button className="SortMethodElement" onClick={() => {setSortMethod("by rating"); setIcon("arrow_upward")}}>by rating<i class="material-icons">arrow_upward</i></button>
          <button className="SortMethodElement" onClick={() => {setSortMethod("by rating"); setIcon("arrow_downward")}}>by rating<i class="material-icons">arrow_downward</i></button>

        </div>
      </div>
    </div>
    <div className="Divider"></div>
    <div className="liked-content">
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