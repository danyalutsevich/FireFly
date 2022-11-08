import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { MovieDBLinks } from "../../Variables";
import { Loading } from "../Loading"
import { Cast } from "./Cast";


import MovieCSS from "./Movie.module.scss";

export function Movie(props) {

    const [movie, setMovie] = useState(undefined);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(MovieDBLinks.movie(id)).then(data => data.json()).then(data => setMovie(data))
        }
    }, [id])

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
