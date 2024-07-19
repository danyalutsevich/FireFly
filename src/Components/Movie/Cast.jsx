import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import CastCSS from "./Cast.module.scss";
import { MovieDBLinks } from "../../Variables";
import { Loading } from "../Loading";
import { WebTorrent } from "./WebTorrent";
import { Images } from "../Images";

export function Cast(props) {
  const [credits, setCredits] = useState(undefined);
  const [similar, setSimilar] = useState(undefined);
  const [images, setImages] = useState([]);

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
    fetch(MovieDBLinks.credits(props.movie_id, props.media_type))
      .then((data) => data.json())
      .then((data) => {
        setCredits(data);
        console.log(data);
      });

    fetch(MovieDBLinks.similar(props.movie_id, props.media_type))
      .then((data) => data.json())
      .then((data) => {
        setSimilar(data.results);
      });

    fetch(MovieDBLinks.images(props.movie_id, props.media_type))
      .then((data) => data.json())
      .then((data) =>
        setImages(
          [
            ...(data?.backdrops || []),
            ...(data?.posters || []),
            ...(data?.profiles || []),
          ].map((image) => MovieDBLinks.image_original + image.file_path),
        ),
      );
  }, [props.movie_id]);

  if (credits === undefined) {
    return <Loading />;
  }

  const renderTabs = (photo, showPhoto, title, description, key, to) => {
    return (
      <div
        className={CastCSS.Tab}
        key={key}
        itemprop="actor"
        itemscope
        itemtype="http://schema.org/Person"
      >
        {showPhoto ? (
          photo ? (
            <img itemprop="image" src={MovieDBLinks.image + photo} />
          ) : (
            <img
              itemprop="image"
              src={"/default_userpic.png"}
              alt={title + " photo"}
            />
          )
        ) : null}
        <div>
          <NavLink to={to} itemprop="url">
            <h2 itemprop="name">{title}</h2>
          </NavLink>
          <h3 itemprop="description">{description}</h3>
        </div>
      </div>
    );
  };

  return (
    <div className={CastCSS.Cast} id="cast">
      <div className={CastCSS.TabButtons}>
        <button
          className={Tab == "cast" ? CastCSS.ActiveButton : null}
          onClick={() => {
            setTab("cast");
          }}
        >
          <span className="material-symbols-outlined">star</span>
          {windowSize[0] > 767 ? <p>Cast</p> : null}
        </button>
        <button
          className={Tab == "crew" ? CastCSS.ActiveButton : null}
          onClick={() => {
            setTab("crew");
          }}
        >
          <span className="material-symbols-outlined">groups</span>
          {windowSize[0] > 767 ? <p>Crew</p> : null}
        </button>
        <button
          className={Tab == "companies" ? CastCSS.ActiveButton : null}
          onClick={() => {
            setTab("companies");
          }}
        >
          <span className="material-symbols-outlined">movie</span>
          {windowSize[0] > 767 ? <p>Production</p> : null}
        </button>
        <button
          className={Tab == "webtorrent" ? CastCSS.ActiveButton : null}
          onClick={() => {
            setTab("webtorrent");
          }}
        >
          <span className="material-symbols-outlined">live_tv</span>
          {windowSize[0] > 767 ? <p>WebTorrent</p> : null}
        </button>
        <button
          className={Tab == "similar" ? CastCSS.ActiveButton : null}
          onClick={() => {
            setTab("similar");
          }}
        >
          <span className="material-symbols-outlined">compare</span>
          {windowSize[0] > 767 ? <p>Similar</p> : null}
        </button>
        <button
          className={Tab == "images" ? CastCSS.ActiveButton : null}
          onClick={() => {
            setTab("images");
          }}
        >
          <span className="material-symbols-outlined">Image</span>
          {windowSize[0] > 767 ? <p>Images ({images?.length})</p> : null}
        </button>
      </div>
      <div className={CastCSS.Tabs}>
        {Tab == "cast" ? (
          credits.cast ? (
            credits.cast.map((tabItem, index) => {
              return renderTabs(
                tabItem.profile_path,
                true,
                tabItem.name,
                tabItem.character,
                index,
                "/person/" + tabItem.id,
              );
            })
          ) : (
            <h2>No data</h2>
          )
        ) : null}
        {Tab == "crew" ? (
          credits.crew.length > 0 ? (
            credits.crew.map((tabItem, index) => {
              return renderTabs(
                tabItem.profile_path,
                true,
                tabItem.name,
                tabItem.job,
                index,
                "/person/" + tabItem.id,
              );
            })
          ) : (
            <h2>No data</h2>
          )
        ) : null}
        {Tab == "companies" ? (
          props.companies.length > 0 ? (
            props.companies.map((tabItem, index) => {
              return renderTabs(
                tabItem.logo_path,
                true,
                tabItem.name,
                tabItem.origin_country,
                index,
                "#",
              );
            })
          ) : (
            <h2>No data</h2>
          )
        ) : null}
        {Tab == "similar" ? (
          similar.length > 0 ? (
            similar.map((tabItem, index) => {
              return renderTabs(
                tabItem.poster_path,
                true,
                tabItem?.title || tabItem?.name,
                tabItem?.release_date?.slice(0, 4),
                index,
                `/${props?.media_type}/` + tabItem.id,
              );
            })
          ) : (
            <h2>No data</h2>
          )
        ) : null}
        {Tab == "webtorrent" ? <WebTorrent imdb_id={props.imdb_id} /> : null}
        {Tab == "images" ? (
          <Images media_type={props?.media_type} movie_id={props.movie_id} />
        ) : null}
      </div>
    </div>
  );
}
