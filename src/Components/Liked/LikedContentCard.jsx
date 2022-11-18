import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MovieDBLinks } from "../../Variables";

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
      {film.poster_path ? (
        <img src={MovieDBLinks.image + film?.poster_path} alt="poster"></img>
      ) : (
        <img src={"/default_userpic.png"} alt="poster"></img>
      )}
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
        <button className={LikedContentCardCSS["save-button"]}>
          <i className={`material-icons`}>favorite</i>
        </button>
      </div>
    </div>
  );
}
