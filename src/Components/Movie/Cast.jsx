import React, { useEffect, useState } from "react";

import CastCSS from "./Cast.module.scss";
import { MovieDBLinks } from "../../Variables";

export function Cast(props) {

    const [cast, setCast] = useState(undefined);

    useEffect(() => {
        fetch(MovieDBLinks.credits(props.movie_id)).then(data => data.json()).then(data => setCast(data.cast))
    }, [])

    return (
        <div className={CastCSS.Cast}>
            <h1>Cast</h1>
            <h1>{props.movie_id}</h1>
            <h1>{JSON.stringify(cast)}</h1>
        </div>
    )
}

