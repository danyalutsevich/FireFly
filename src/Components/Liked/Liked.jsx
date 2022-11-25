import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from "react-router-dom";

import { FirebaseContext } from '../../firebase-config';

import LikedCSS from "./Liked.module.scss";
import { LikedContentCard } from "./LikedContentCard";

import { MovieDBLinks } from '../../Variables';
import { Loading } from '../Loading';

export function Liked() {
  const [sortMethod, setSortMethod] = useState("by date added")
  const [icon, setIcon] = useState("arrow_upward")


  const contextData = useContext(FirebaseContext)
  const [liked, setLiked] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [user, setUser] = useState(null);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    setLiked(contextData.liked);
    setWatchlist(contextData.watchlist);
    setUser(contextData.user);
    setRatings(contextData.ratings);
  }, [contextData]);

  if (liked.length == 0) {
    return (
      <div className={LikedCSS.NoLikedFilms}>
        <h1>Your liked films <br />will appear here</h1>
      </div>
    )
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
            <button onClick={() => { setSortMethod("by date added"); setIcon("arrow_upward") }}>by date added<i className="material-icons">arrow_upward</i></button>
            <button onClick={() => { setSortMethod("by date added"); setIcon("arrow_downward") }}>by date added<i className="material-icons">arrow_downward</i></button>
            <button onClick={() => { setSortMethod("by rating"); setIcon("arrow_upward") }}>by rating<i className="material-icons">arrow_upward</i></button>
            <button onClick={() => { setSortMethod("by rating"); setIcon("arrow_downward") }}>by rating<i className="material-icons">arrow_downward</i></button>
          </div>
        </div>
      </div>
      <div className={LikedCSS.Divider}></div>
      <div className={LikedCSS["Liked-content"]}>
        {
          liked.map((id) => {
            return (
              <LikedContentCard 
              filmID={id}
              liked={liked?.includes(Number(id))}
              watchlist={watchlist?.includes(Number(id))}
              rating={ratings[id]}
              user={user}
              key={id}
              />
            )
          })
        }
      </div>

    </div>
  );
}