import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Iframe from 'react-iframe'
import { MovieDBLinks } from "../../Variables";
import { Loading } from "../Loading";
import { Cast } from "./Cast";
import { WebTorrent } from "./WebTorrent";

import { TableOperations } from "../Table/TableOperations";
import { like, FirebaseContext, saveToWatchlist } from "../../firebase-config";

import MovieCSS from "./Movie.module.scss";
import { useInsertionEffect } from "react";

export function Movie(props) {
  const [movie, setMovie] = useState(undefined);
  const { id } = useParams();
  const [VideoId, setVideoId] = useState(undefined);
  const [TrailerKey, setTrailerKey] = useState(undefined);


  useEffect(() => {
    window.scrollTo(0, 0)
    if (id) {
      fetch(MovieDBLinks.movie(id))
        .then((data) => data.json())
        .then((data) => { setMovie(data); document.title = data.title });

      fetch(MovieDBLinks.video(id))
        .then(res => res.json())
        .then(data => {
          setVideoId(data.results.find((video) => video.type === "Trailer"))
        })
    }
  }, [id]);

  const contextData = useContext(FirebaseContext);
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



  if (movie === undefined) {
    return <Loading />;
  }

  return (
    <div className={MovieCSS.Movie} style={{ backgroundColor: movie.adult ? "#720000" : "#272727" }}>
      <div className={MovieCSS.Backdrop}>
        <img
          src={MovieDBLinks.image_original + movie.backdrop_path}
          alt="backdrop"
        />
        <div className={MovieCSS.EdgeBlur} style={{ boxShadow: movie.adult ? "0 0 80px 150px inset #720000" : "0 0 80px 150px inset #272727" }}></div>
      </div>
      <div className={MovieCSS.Description}>
        <div>
          {movie.poster_path ? (
            <img
              src={MovieDBLinks.image_original + movie.poster_path}
              alt={movie.title + " poster"}
              srcSet={MovieDBLinks.image + movie.poster_path}
            ></img>
          ) : (
            <img
              src={"/default_userpic.png"}
              alt={movie.title + " poster"}
            ></img>
          )}
        </div>
        <div>
          <div className={MovieCSS.Title}>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date.slice(0, 4)}</h3>
            <h2>Rating: {movie.vote_average}</h2>
          </div>
          <div>
            {user ? (
              <TableOperations
                filmID={id}
                liked={liked?.includes(Number(id))}
                watchlist={Object.values(watchlist).flat().includes(Number(id))}
                rating={ratings[id]}
              />
            ) : null}
          </div>
          <div className={MovieCSS.About}>
            <h2>{movie.tagline}</h2>
            <h2>{movie.overview}</h2>
          </div>
          <div className={MovieCSS.Video}>
            {VideoId?.key &&
              <Iframe
                url={"https://www.youtube.com/embed/" + VideoId?.key}
                className={MovieCSS.Trailer}
                align="center"
                allowFullScreen />}
          </div>
        </div>
      </div>
      <Cast movie_id={id} companies={movie.production_companies} imdb_id={movie.imdb_id} />
    </div>
  );
}
