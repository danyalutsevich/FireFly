import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Iframe from 'react-iframe'
import { Helmet } from "react-helmet";

import { MovieDBLinks } from "../../Variables";
import { Loading } from "../Loading";
import { Cast } from "./Cast";
import { WebTorrent } from "./WebTorrent";

import { TableOperations } from "../Table/TableOperations";
import { like, FirebaseContext, saveToWatchlist } from "../../firebase-config";

import MovieCSS from "./Movie.module.scss";

export function Movie(props) {
  const [movie, setMovie] = useState(undefined);
  const { id } = useParams();
  const [VideoId, setVideoId] = useState(undefined);
  const [ExternalIds, setExternalIds] = useState(undefined);

  useEffect(() => {
    window.scrollTo(0, 0)
    if (id) {
      if (props.media_type === "movie") {
        fetch(MovieDBLinks.movie(id))
          .then((data) => data.json())
          .then((data) => {
            setMovie(data);
          })
      }
      else if (props.media_type === "tv") {
        fetch(MovieDBLinks.tv(id))
          .then((data) => data.json())
          .then((data) => {
            setMovie(data);
          });
      }

      fetch(MovieDBLinks.external_ids(id, props.media_type))
        .then(data => data.json())
        .then(data => { setExternalIds(data) })

      fetch(MovieDBLinks.video(id, props.media_type))
        .then(data => data.json())
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

  const meta = `${movie?.title || movie?.name} смотреть онлайн watch online torrent скачать download `

  if (movie === undefined) {
    return <div>
      <Helmet>
        <title>{movie?.title || movie?.name}</title>
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={movie?.title || movie?.name} />
        <meta property="og:description" content={`${meta} About movie: ` + movie?.overview} />
        <meta property="og:image" content={movie?.poster_path ? MovieDBLinks.image_original + movie?.poster_path : "https://fireflyratings.com/default_userpic.png"} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Firefly" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={movie?.title || movie?.name} />
        <meta name="twitter:description" content={`${meta} About movie: ` + movie?.overview} />
        <meta name="twitter:image" content={movie?.poster_path ? MovieDBLinks.image_original + movie?.poster_path : "https://fireflyratings.com/default_userpic.png"} />

        <meta name="description" content={meta} />
      </Helmet>
      <Loading />;
    </div>
  }

  const movieData = {
    "@context": "http://schema.org",
    "@type": "Movie",
    "name": movie?.title || movie?.name,
    "description": meta + movie?.overview,
    "image": movie?.poster_path ? MovieDBLinks.image_original + movie?.poster_path : "https://fireflyratings.com/default_userpic.png",
    "url": window.location.href,
    "datePublished": movie?.release_date || movie?.first_air_date,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": movie?.vote_average.toFixed(1),
      "reviewCount": movie?.vote_count
    },
    "duration": movie?.runtime,
    "genre": movie?.genres.map(genre => genre.name),
  }

  return (
    <div className={MovieCSS.Movie} style={{ backgroundColor: movie.adult ? "#720000" : "#272727" }} itemscope itemtype="https://schema.org/Movie">
      <Helmet>
        <title>{movie.title || movie.name}</title>

        <script type="application/ld+json">{JSON.stringify(movieData)}</script>
        <meta property="og:title" content={movie.title || movie.name} />
        <meta property="og:description" content={`${meta} About movie: ` + movie?.overview} />
        <meta property="og:image" content={movie?.poster_path ? MovieDBLinks.image_original + movie.poster_path : "https://fireflyratings.com/default_userpic.png"} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Firefly" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={movie.title || movie.name} />
        <meta name="twitter:description" content={`${meta} About movie: ` + movie?.overview} />
        <meta name="twitter:image" content={movie?.poster_path ? MovieDBLinks.image_original + movie.poster_path : "https://fireflyratings.com/default_userpic.png"} />

        <meta name="description" content={meta} />
      </Helmet>

      <div className={MovieCSS.Backdrop}>
        <img
          src={MovieDBLinks.image_original + movie.backdrop_path}
          alt="backdrop"
          itemprop="image"
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
              itemprop="image"
            ></img>
          ) : (
            <img
              src={"/default_userpic.png"}
              alt={movie.title + " poster"}
              itemprop="image"
            ></img>
          )}
        </div>
        <div>
          <div className={MovieCSS.Title}>
            <h1 itemprop="name">{movie?.title || movie?.name}</h1>
            <h3 itemprop="datePublished">{movie?.release_date?.slice(0, 4) || ((movie?.first_air_date?.slice(0, 4) || "") + "  " + (movie?.last_air_date?.slice(0, 4) || ""))}</h3>
          </div>
          <div className={MovieCSS.About}>
            {user ? (
              <TableOperations
                filmID={id}
                liked={liked?.includes(Number(id))}
                watchlist={Object.values(watchlist).flat().includes(Number(id))}
                rating={ratings[id]}
              />
            ) : null}
            <h2 itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">Rating: {movie.vote_average}</h2>
            <h2 itemprop="slogan" itemtype="http://schema.org/Product">{movie.tagline}</h2>
            <h2 itemprop="description">{movie.overview}</h2>
          </div>
        </div>
      </div>
      <div className={MovieCSS.Video} itemprop="trailer">
        {VideoId?.key &&
          <Iframe
            url={"https://www.youtube.com/embed/" + VideoId?.key}
            className={MovieCSS.Trailer}
            align="center"
            allowFullScreen
            title="Trailer"
          />}
      </div>
      <Cast movie_id={id} companies={movie?.production_companies} imdb_id={ExternalIds?.imdb_id} media_type={props.media_type} />
    </div>
  );
}
