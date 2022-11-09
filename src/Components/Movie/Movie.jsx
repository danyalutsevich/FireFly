import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { MovieDBLinks } from "../../Variables";
import { Loading } from "../Loading"
import { Cast } from "./Cast";

import { TableOperations } from "../Table/TableOperations";
import { like, FirebaseContext, saveToWatchlist } from "../../firebase-config";


import MovieCSS from "./Movie.module.scss";

export function Movie(props) {

    const [movie, setMovie] = useState(undefined);
    const { id } = useParams();

    const contextData = useContext(FirebaseContext);
    const [liked, setLiked] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [user, setUser] = useState(null);
    const [ratings, setRatings] = useState([]);

    

    useEffect(() => {
        if (id) {
            fetch(MovieDBLinks.movie(id)).then(data => data.json()).then(data => setMovie(data))
        }
    }, [id])

    useEffect(() => {
        setLiked(contextData.liked)
        setWatchlist(contextData.watchlist)
        setUser(contextData.user)
        setRatings(contextData.ratings)
      }, [contextData]);

    if (movie === undefined) {
        return <Loading />
    }


    return (

        <div className={MovieCSS.Movie}>
            <div className={MovieCSS.Backdrop}>
                <img src={MovieDBLinks.image_original + movie.backdrop_path} alt="backdrop" />
                <div className={MovieCSS.EdgeBlur}></div>
            </div>
            <div className={MovieCSS.Description}>
                <div>
                    {
                        movie.poster_path ? 
                        <img src={MovieDBLinks.image_original + movie.poster_path} alt="poster"></img>:
                        <img src={"/default_userpic.png"} alt="poster"></img>
                        
                    }
                </div>
                <div>
                    <div className={MovieCSS.Title}>
                        <h1>{movie.title}</h1>
                        <h3>{movie.release_date.slice(0, 4)}</h3>
                        <h2>Rating: {movie.vote_average}</h2>
                    </div>
                    <div>
                    {user ? <TableOperations filmID={id}
                    liked={liked?.includes(Number(id))}
                    watchlist={watchlist?.includes(Number(id))}
                    rating={ratings[id]}
                  /> : null}
                  </div>
                    <div className={MovieCSS.About}>
                        <h2>{movie.tagline}</h2>
                        <h2>{movie.overview}</h2>
                    </div>
                </div>
            </div>
            <Cast movie_id={id} companies={movie.production_companies} />
        </div>
    )

}
