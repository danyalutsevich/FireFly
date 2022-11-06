import React, { useEffect, useState } from "react";

import CastCSS from "./Cast.module.scss";
import { MovieDBLinks } from "../../Variables";
import { Loading } from "../Loading";

export function Cast(props) {

    const [credits, setCredits] = useState(undefined);
    const [Tab, setTab] = useState(undefined);

    useEffect(() => {
        fetch(MovieDBLinks.credits(props.movie_id))
            .then(data => data.json())
            .then(data => { setCredits(data); setTab(data.cast) })

    }, [props.movie_id])



    if (credits === undefined) {
        return <Loading />
    }
    return (
        <div className={CastCSS.Cast}>
            <button onClick={() => setTab(credits.cast)}>Cast</button>
            <button onClick={() => setTab(credits.crew)}>Crew</button>
            <button onClick={() => { setTab(props.companies) }}>Details</button>
            <div className={CastCSS.Tabs}>
                {
                    Tab.map((tabItem, index) => {
                        return (
                            <div className={CastCSS.Tab} key={index}>
                                <object data={MovieDBLinks.image + tabItem.profile_path} type="image/jpg">
                                    <object data={MovieDBLinks.image + tabItem.logo_path} type="image/jpg">
                                        <img src={"/default_userpic.png"} alt="profile"></img>
                                    </object>
                                </object>
                                <div>
                                    <h2>{tabItem.name}</h2>
                                    <h3>{tabItem.character}</h3>
                                    <h3>{tabItem.job}</h3>
                                    <h3>{tabItem.origin_country}</h3>
                                </div>
                            </div>)
                    })
                }
            </div>
        </div>
    )
}

