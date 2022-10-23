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
                <img src={MovieDBLinks.image_original + movie.backdrop_path} />
                <div className={MovieCSS.EdgeBlur}></div>
            </div>
            <div className={MovieCSS.Description}>
                <div>
                    <img src={MovieDBLinks.image_original + movie.poster_path} alt="poster"></img>
                </div>
                <div>
                    <h1>{movie.title}</h1>
                    <h2>{movie.release_date.slice(0, 4)}</h2>
                    <h2>{movie.overview}</h2>
                </div>
            </div>
            <Cast movie_id={id} />

            {/* <div>
                <pre>{JSON.stringify(movie, undefined, 2)}</pre>
            </div> */}
        </div>
    )

}
