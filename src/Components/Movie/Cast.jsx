import React, { useEffect, useState } from "react";

import CastCSS from "./Cast.module.scss";
import { MovieDBLinks } from "../../Variables";
import { Loading } from "../Loading";
import { WebTorrent } from "./WebTorrent";

export function Cast(props) {
  const [credits, setCredits] = useState(undefined);
  const [Tab, setTab] = useState("cast");

  useEffect(() => {
    fetch(MovieDBLinks.credits(props.movie_id))
      .then((data) => data.json())
      .then((data) => {
        setCredits(data);
      });
  }, [props.movie_id]);

  if (credits === undefined) {
    return <Loading />;
  }

  const renderTabs = (photo, showPhoto, title, description, key) => {

    return (
      <div className={CastCSS.Tab} key={key}>
        {showPhoto ?
          photo ?
            <img src={MovieDBLinks.image + photo} /> :
            <img src={"/default_userpic.png"} alt={title + " photo"} /> :
          null
        }<div>
          <h2>{title}</h2>
          <h3>{description}</h3>
        </div>
      </div>
    )
  }

  return (
    <div className={CastCSS.Cast} id="cast">
      <button className={Tab == "cast" ? CastCSS.ActiveButton : null} onClick={() => { setTab("cast") }}>Cast</button>
      <button  className={Tab == "crew" ? CastCSS.ActiveButton : null}  onClick={() => { setTab("crew") }}>Crew</button>
      <button   className={Tab == "companies" ? CastCSS.ActiveButton : null} onClick={() => { setTab("companies") }}>Details</button>
      <button  className={Tab == "webtorrent" ? CastCSS.ActiveButton : null}  onClick={() => { setTab("webtorrent") }}>WebTorrent</button>
      <div className={CastCSS.Tabs}>
        {Tab == "cast" ? credits.cast.map((tabItem, index) => {
          return (renderTabs(tabItem.profile_path, true, tabItem.name, tabItem.character, index))
        }) : null}
        {Tab == "crew" ? credits.crew.map((tabItem, index) => {
          return (renderTabs(tabItem.profile_path, true, tabItem.name, tabItem.job, index))
        }) : null}
        {Tab == "companies" ? props.companies.map((tabItem, index) => {
          return (renderTabs(tabItem.logo_path, true, tabItem.name, tabItem.origin_country, index))
        }) : null}
        {Tab == "webtorrent" ? <WebTorrent imdb_id={props.imdb_id} /> : null}
      </div>


    </div>
  );
}

// <div className={CastCSS.Tab} key={index}>
//   {tabItem.profile_path ?
//     <img src={MovieDBLinks.image + tabItem.profile_path} /> :
//     <img src={"/default_userpic.png"} alt={tabItem.name + " photo"} />
//   }<div>
//     <h2>{tabItem.name}</h2>
//     <h3>{tabItem.character}</h3>
//     <h3>{tabItem.job}</h3>
//     <h3>{tabItem.origin_country}</h3>
//   </div>
// </div>
// );
// data={MovieDBLinks.image + tabItem.logo_path}