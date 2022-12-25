import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MovieDBLinks } from "../../Variables";
import { TableOperations } from "../Table";


import { like, FirebaseContext } from "../../firebase-config";

import { useContext } from "react";


import LikedContentCardCSS from "./LikedContentCard.module.scss";

export function LikedContentCard(props) {

  const {
    filmID,
    liked,
    watchlist,
    rating,
    user,
  } = props;

  const [film, setFilm] = useState({});

  // console.log(filmID);



  useEffect(() => {
    fetch(MovieDBLinks.movie(filmID))
      .then((data) => data.json())
      .then((data) => setFilm(data));
  }, [filmID]);

  return (
    <div className={LikedContentCardCSS.LikedFilm} key={filmID}>
      <NavLink to={`/movie/${film.id}`} key={filmID}>
        {film.poster_path ?
          <img
            src={MovieDBLinks.image_original + film?.poster_path}
            alt={film?.title + " poster"}
            srcSet={MovieDBLinks.image + film?.poster_path}
          />
          :
          <img src={"/default_userpic.png"} alt={film?.title + " poster"}></img>
        }
      </NavLink>
      <div className={LikedContentCardCSS.LikeOptions}>
        {user ? (
          <TableOperations
            filmID={filmID}
            liked={liked}
            watchlist={watchlist}
            rating={rating}
          />
        ) : null}
      </div>
    </div>
  );
}
