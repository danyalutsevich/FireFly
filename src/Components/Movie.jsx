import React from "react";
import { useParams } from "react-router-dom";

import { MovieDBLinks } from "./Variables";
import { useState, useEffect } from "react";

import MovieCSS from "./Movie.module.css";

export default function Movie(props){

    const [movie, setMovie] = useState(undefined);
    
    const { id } = useParams();

    useEffect(()=>{
        console.log(id);
        fetch(MovieDBLinks.movie(4935)).then(data => data.json()).then(data => setMovie(data))
    },[id])

    return (

        <div>
            <h1 className={MovieCSS.title}>Movie</h1>
            <h2>{JSON.stringify(movie)}</h2>
        </div>
    )

}
