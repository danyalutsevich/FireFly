import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import CastCSS from "./Cast.module.scss";
import { MovieDBLinks } from "../../Variables";
import { Loading } from "../Loading";
import { WebTorrent } from "./WebTorrent";

export function Cast(props) {
  const [credits, setCredits] = useState(undefined);
  const [similar, setSimilar] = useState(undefined);
  const [Tab, setTab] = useState("cast");

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => {
    fetch(MovieDBLinks.credits(props.movie_id))
      .then((data) => data.json())
      .then((data) => {
        setCredits(data);
      });

    fetch(MovieDBLinks.similar(props.movie_id))
      .then((data) => data.json())
      .then((data) => {
        setSimilar(data.results);
      })


  }, [props.movie_id]);

  if (credits === undefined) {
    return <Loading />;
  }



  const renderTabs = (photo, showPhoto, title, description, key, to) => {

    return (
      <div className={CastCSS.Tab} key={key}>
        {showPhoto ?
          photo ?
            <img src={MovieDBLinks.image + photo} /> :
            <img src={"/default_userpic.png"} alt={title + " photo"} /> :
          null
        }<div>
          <NavLink to={to}>
            <h2>{title}</h2>
          </NavLink>
          <h3>{description}</h3>
        </div>
      </div>
    )
  }

  return (
    <div className={CastCSS.Cast} id="cast">
      <div className={CastCSS.TabButtons}>
        <button className={Tab == "cast" ? CastCSS.ActiveButton : null} onClick={() => { setTab("cast") }}>
          <span class="material-symbols-outlined">star</span>
          {windowSize[0]>767 ? <p>Cast</p> : null}</button>
        <button className={Tab == "crew" ? CastCSS.ActiveButton : null} onClick={() => { setTab("crew") }}>
          <span class="material-symbols-outlined">groups</span>
          {windowSize[0]>767 ? <p>Crew</p> : null}</button>
        <button className={Tab == "companies" ? CastCSS.ActiveButton : null} onClick={() => { setTab("companies") }}>
          <span class="material-symbols-outlined">movie</span>
          {windowSize[0]>767 ? <p>Production</p> : null}</button>
        <button className={Tab == "webtorrent" ? CastCSS.ActiveButton : null} onClick={() => { setTab("webtorrent") }}>
          <span class="material-symbols-outlined">live_tv</span>
          {windowSize[0]>767 ? <p>WebTorrent</p> : null}</button>
        <button className={Tab == "similar" ? CastCSS.ActiveButton : null} onClick={() => { setTab("similar") }}>
          <span class="material-symbols-outlined">compare</span>
          {windowSize[0]>767 ? <p>Similar</p> : null}</button>
      </div>
      <div className={CastCSS.Tabs}>
        {Tab == "cast" ? credits.cast.map((tabItem, index) => {
          return (renderTabs(tabItem.profile_path, true, tabItem.name, tabItem.character, index, "#"))
        }) : null}
        {Tab == "crew" ? credits.crew.map((tabItem, index) => {
          return (renderTabs(tabItem.profile_path, true, tabItem.name, tabItem.job, index, "#"))
        }) : null}
        {Tab == "companies" ? props.companies.map((tabItem, index) => {
          return (renderTabs(tabItem.logo_path, true, tabItem.name, tabItem.origin_country, index, "#"))
        }) : null}
        {Tab == "similar" ? similar.map((tabItem, index) => {
          return (renderTabs(tabItem.poster_path, true, tabItem.title, tabItem.release_date.slice(0,4), index, "/movie/" + tabItem.id))
        }) : null}
        {Tab == "webtorrent" ? <WebTorrent imdb_id={props.imdb_id} /> : null}
      </div>


    </div>
  );
}
