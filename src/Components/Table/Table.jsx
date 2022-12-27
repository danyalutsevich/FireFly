import React, { useState, useEffect, useRef } from "react";
import { MovieDBLinks } from "../../Variables";
import { NavLink, useParams } from "react-router-dom";

import TableCSS from "../Table/Table.module.scss";
import { like, FirebaseContext, saveToWatchlist } from "../../firebase-config";
import { useContext } from "react";
import { TableOperations } from "./TableOperations";

export function Table(props) {
  // films is an array of objects (films)
  // page is the current page number
  // url created for the search page provide here the searchValue
  const { films, page, url } = props;
  if (page == NaN || page < 1 || page == undefined) {
    page = 1;
  }

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
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <div className={TableCSS.Table}>
      {windowSize[0] < 767 ? (
        <div className={TableCSS.FilmsList_mobile}>
          {films.map((film, index) => {
            return (
              <div className={TableCSS.FilmCell_mobile}>
                <NavLink to={`/movie/${film.id}`}>
                  <div>
                    <img
                      className={TableCSS.MoviePoster}
                      src={MovieDBLinks.image + film.poster_path}
                      alt={film.original_title + " poster"}
                      srcSet={MovieDBLinks.image_original + film.poster_path}
                      onClick={() => {
                        window.location.href = "/movie/" + film.id;
                      }}
                    />
                    <div>
                      <h3>{film.original_title}</h3>
                      <p>Rating | {film.vote_average}</p>
                      <p>Year | {film.release_date?.slice(0, 4)}</p>
                    </div>
                  </div>
                </NavLink>
                {user ? (
                  <TableOperations
                    filmID={film.id}
                    liked={liked?.includes(film.id)}
                    watchlist={Object.values(watchlist)
                      .flat()
                      .includes(film.id)}
                    rating={ratings[film.id]}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Picture</th>
              <th>Title</th>
              <th></th>
              <th>Year</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {films.map((film, index) => {
              return (
                <tr key={film.id}>
                  <td>{index + 1 + (page - 1) * films.length}</td>
                  <td className={TableCSS.imageCell}>
                    {film.poster_path ? (
                      <img
                        className={TableCSS.MoviePoster}
                        src={MovieDBLinks.image + film.poster_path}
                        alt={film.original_title + " poster"}
                        srcSet={MovieDBLinks.image_original + film.poster_path}
                        onClick={() => {
                          window.location.href = "/movie/" + film.id;
                        }}
                      />
                    ) : (
                      <img
                        className={TableCSS.MoviePoster}
                        src={"/default_userpic.png"}
                        alt={film.original_title + " poster"}
                      />
                    )}
                  </td>
                  <td>
                    <NavLink to={`/movie/${film.id}`} className={TableCSS.Link}>
                      {film.original_title}
                    </NavLink>
                  </td>
                  <td>
                    {user ? (
                      <TableOperations
                        filmID={film.id}
                        liked={liked?.includes(film.id)}
                        watchlist={Object.values(watchlist)
                          .flat()
                          .includes(film.id)}
                        rating={ratings[film.id]}
                      />
                    ) : null}
                  </td>
                  <td>{film.release_date?.slice(0, 4)}</td>
                  <td>{film.vote_average}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className={TableCSS.Pages}>
        <NavLink
          className={TableCSS.PageButton}
          to={`/${url == "" ? "" : url + "/"}${
            Number(page) === 1 ? 1 : Number(page) - 1
          }`}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          prev
        </NavLink>
        <NavLink
          className={TableCSS.PageButton}
          to={`/${url == "" ? "" : url + "/"}${Number(page) + 1}`}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          next
        </NavLink>
      </div>
    </div>
  );
}
