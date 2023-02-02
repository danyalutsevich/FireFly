import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { MovieDBLinks } from "../../Variables";
import { Loading } from "../Loading";

import PersonCSS from "./Person.module.scss";

export function Person(props) {

    const params = useParams();
    const [person, setPerson] = useState(undefined);
    const [credits, setCredits] = useState(undefined);

    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(MovieDBLinks.person(params.id))
            .then(data => data.json())
            .then(data => setPerson(data))
        fetch(MovieDBLinks.person_credits(params.id))
            .then(data => data.json())
            .then(data => setCredits(data))
    }, [params.id]);

    if (person === undefined) {
        return (
            <Loading />
        )
    }
    document.title = person.name

    return (
        <div className={PersonCSS.Person}>
            <div className={PersonCSS.Description}>
                <img className={PersonCSS.PersonPic} src={person?.profile_path ? MovieDBLinks.image_original + person?.profile_path : "/default_userpic.png"} alt={"Picture of " + person.name} />
                <div>
                    {person?.name && <h1>{person?.name}</h1>}
                    {person?.birthday && <h2>Birthday: <p>{person?.birthday}</p></h2>}
                    {person?.deathday && <h2>Deathday: <p>{person?.deathday}</p></h2>}
                    {person?.homepage && <h2>Homepage: <a href={person.homepage}>{person.homepage}</a></h2>}
                    {person?.also_known_as?.length > 0 && <h2>Also known as: <p>{person.also_known_as.map((name) => name + ", ")}</p></h2>}
                    {person?.known_for_department && <h2>Known for: <p>{person?.known_for_department}</p></h2>}
                    {person?.place_of_birth && <h2>Place of birth: <p>{person?.place_of_birth}</p></h2>}
                    {person?.biography && <><h2>Biography: </h2> <p>{person?.biography}</p></>}
                    {/* {JSON.stringify(person)} */}
                </div>
            </div>
            <h1>Credits</h1>
            <div className={PersonCSS.Credits}>
                {credits?.cast?.map((movie) => {
                    return (
                        <NavLink to={"/"+movie.media_type+"/" + movie?.id}>

                            <div className={PersonCSS.Credit}>
                                <img src={movie?.poster_path ? MovieDBLinks.image_original + movie?.poster_path : "/default_userpic.png"} alt={"Poster of " + movie?.title} />
                                {/* <h2>{movie?.title}</h2> */}
                                {/* <h3>{movie?.character}</h3> */}
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )


}