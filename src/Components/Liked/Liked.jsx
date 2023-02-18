import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from "react-router-dom";

import { FirebaseContext } from '../../firebase-config';
import LikedCSS from "./Liked.module.scss";
import { LikedContentCard } from "./LikedContentCard";

export function Liked() {

  const contextData = useContext(FirebaseContext)
  const [liked, setLiked] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [user, setUser] = useState(null);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    setLiked(contextData.liked.reverse());
    setWatchlist(contextData.watchlist);
    setUser(contextData.user);
    setRatings(contextData.ratings);
  }, [contextData]);

  if (liked.length == 0) {
    return (
      <div className={LikedCSS.NoLikedFilms}>
        <Helmet>
          <title>Liked</title>
          <meta property="og:title" content="Liked" />
          <meta property="og:description" content="Your liked films will appear here" />
          <meta name="description" content="Your liked films will appear here" />
        </Helmet>
        <h1>Your liked films <br />will appear here</h1>
      </div>
    )
  }

  return (
    <div className={LikedCSS.Liked}>
        <Helmet>
          <title>Liked</title>
          <meta property="og:title" content="Liked" />
          <meta property="og:description" content="Your liked films will appear here" />
          <meta name="description" content="Your liked films will appear here" />
        </Helmet>
      <div className={LikedCSS.Header}>
        <h2>Liked</h2>
        <div className={LikedCSS.Sort}>
          <span className="material-symbols-outlined"
            onClick={() => {
              setLiked([...liked.reverse()])
            }}
          >
            swap_vert
          </span>
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
                watchlist={Object.values(watchlist).flat().includes(Number(id))}
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