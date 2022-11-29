import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MovieDBLinks } from "../../Variables";

import { like, FirebaseContext } from "../../firebase-config";

import { useContext } from "react";


import LikedContentCardCSS from "./LikedContentCard.module.scss";

export function LikedContentCard(props) {
  const [film, setFilm] = useState({});

  const contextData = useContext(FirebaseContext);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    setLiked(contextData.liked);
  }, [contextData]);

  useEffect(() => {
    fetch(MovieDBLinks.movie(props.id))
      .then((data) => data.json())
      .then((data) => setFilm(data));
  }, []);

  return (
    <div className={LikedContentCardCSS["Content-card"]}>
      <NavLink style={{margin:'0'}} to={`/movie/${film.id}`} key={film}>
      {film.poster_path ? (
        <img
          src={MovieDBLinks.image + film?.poster_path}
          alt={film?.title + " poster"}
          srcSet={MovieDBLinks.image_original + film?.poster_path}
        ></img>
      ) : (
        <img src={"/default_userpic.png"} alt={film?.title + " poster"}></img>
      )}
      </NavLink>
      <div>
        <span className={LikedContentCardCSS["more-info"]}>
          <button className={LikedContentCardCSS["more-info-button"]}>
            <i className="material-icons">more_horiz</i>
          </button>
          <span className={LikedContentCardCSS["dropdown"]}>
            <button className={LikedContentCardCSS["more-info-element"]}>
              Перейти куда-то
            </button>
            <button className={LikedContentCardCSS["more-info-element"]}>
              Перейти куда-то еще
            </button>
          </span>
        </span>
        <span className={`material-symbols-outlined ${liked.includes(film.id) ? LikedContentCardCSS.Liked : LikedContentCardCSS.NonLiked}`}
                    onClick={() => { like(film.id) }}>favorite</span>
      </div>
    </div>
  );
}
