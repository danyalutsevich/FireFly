import React, { useEffect, useState, useContext, useParams } from "react";
import { auth, FirebaseContext } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { NavLink } from "react-router-dom";

import { LikedContentCard } from "../Liked/LikedContentCard";

import { MovieDBLinks } from "../../Variables";

import WatchlistPopUpCSS from "./WatchlistPopUp.module.scss";

export function WatchlistPopUp(props) {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch(MovieDBLinks.search(props.searchValue, 1))
      .then((data) => data.json())
      .then((data) => {
        setFilms(data.results.slice(0, 7));
      });
  });
  return (
    <div
      className={WatchlistPopUpCSS.WatchlistPopUp}>
      <div className={WatchlistPopUpCSS.blocker} onClick={props.closePopUp}></div>
      <div className={WatchlistPopUpCSS.Content} 
      style={{ border: "5px solid" + props.color }}>
        <div className={WatchlistPopUpCSS.header}>
          <h3>{props.folderTitle}</h3>
          <i className="material-icons" onClick={props.closePopUp}>
            close
          </i>
        </div>
        <div className={WatchlistPopUpCSS.ContentFilms}>
          {films.map((film) => {
            return <LikedContentCard id={film.id} key={film.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
