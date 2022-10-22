import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { MovieDBLinks } from "../../Variables";
import { Loading } from "../Loading"


import MovieCSS from "./Movie.module.scss";

export function Movie(props) {

    const [movie, setMovie] = useState(undefined);
    // const [id, setId] = useState(undefined);

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
                <img src={MovieDBLinks.image + movie.backdrop_path}></img>
            </div>
            <div className={MovieCSS.Description}>
                <div>
                    <img src={MovieDBLinks.image + movie.poster_path} alt="poster"></img>
                </div>
                <div>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                </div>
                <div>
                    {/* <p>Directed by {movie}</p> */}
                    <p>{movie.release_date.slice(0, 4)}</p>
                </div>
            </div>

            <pre>{JSON.stringify(movie, undefined, 2)}</pre>
        </div>
    )

}
