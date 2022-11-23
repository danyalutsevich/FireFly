import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MovieDBLinks } from "../../Variables";

import { like } from "../../firebase-config";


import LikedContentCardCSS from "./LikedContentCard.module.scss";

export function LikedContentCard(props) {
  const [film, setFilm] = useState({});

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
        <button className={LikedContentCardCSS["save-button"]} onClick={() => like(props.id)}><i className={`material-icons`}>favorite</i></button>
      </div>
    </div>
  );
}
