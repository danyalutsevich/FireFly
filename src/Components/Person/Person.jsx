import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { MovieDBLinks } from "../../Variables";
import { Loading } from "../Loading";
import { Images } from "../Images";

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
    document.querySelector('meta[name="description"]').setAttribute("content", person?.biography)
    document.querySelector('meta[property="og:title"]').setAttribute("content", person?.name)
    document.querySelector('meta[property="og:description"]').setAttribute("content", person?.biography)
    document.querySelector('meta[property="og:image"]').setAttribute("content", person?.profile_path ? MovieDBLinks.image_original + person?.profile_path : "https://fireflyratings.com/default_userpic.png")
    return (
        <div className={PersonCSS.Person}  itemscope itemtype="http://schema.org/Person">
            <div className={PersonCSS.Description}>
                <img itemprop="image" className={PersonCSS.PersonPic} src={person?.profile_path ? MovieDBLinks.image_original + person?.profile_path : "/default_userpic.png"} alt={"Picture of " + person.name} />
                <div>
                    {person?.name && <h1 itemprop="name">{person?.name}</h1>}
                    {person?.birthday && <h2  itemprop="birthDate">Birthday: <p>{person?.birthday}</p></h2>}
                    {person?.deathday && <h2 itemprop="deathDate">Deathday: <p>{person?.deathday}</p></h2>}
                    {person?.homepage && <h2 itemprop="url">Homepage: <a href={person.homepage}>{person.homepage}</a></h2>}
                    {person?.also_known_as?.length > 0 && <h2>Also known as: {person.also_known_as.map((name) => <p  itemprop="alternateName">{name}</p>)}</h2>}
                    {person?.known_for_department && <h2>Known for: <p>{person?.known_for_department}</p></h2>}
                    {person?.place_of_birth && <h2>Place of birth: <p  itemprop="birthPlace" itemscope itemtype="http://schema.org/Place">{person?.place_of_birth}</p></h2>}
                </div>
            </div>
            {person?.biography && <><h1>Biography </h1> <p itemprop="description">{person?.biography}</p></>}
            <h1>Photos</h1>
            <div className={PersonCSS.Photos}>
                <Images itemprop="image" media_type="person" movie_id={params.id}/>
            </div>
            <h1>Credits</h1>
            <div className={PersonCSS.Credits}>
                {credits?.cast?.map((movie) => {
                    return (
                        <NavLink itemprop="url" to={"/" + movie.media_type + "/" + movie?.id}>

                            <div className={PersonCSS.Credit}>
                                <img itemprop="image" src={movie?.poster_path ? MovieDBLinks.image_original + movie?.poster_path : "/default_userpic.png"} alt={"Poster of " + movie?.title} />
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