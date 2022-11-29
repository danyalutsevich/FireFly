import React, { useEffect, useState, useContext } from "react";
import { auth, FirebaseContext, resetPasword } from "../../firebase-config";

import WatchlistCSS from "./Watchlist.module.scss";

import { WatchlistFolder } from "../WatchlistFolder";
import { AddWatchlistFolder } from "../AddWatchlistFolder";

import { WatchlistPopUp } from "../WatchlistPopUp";

export function Watchlist() {
  const contextVal = useContext(FirebaseContext);

  const [showPopUp, setShowPopUp] = useState(false);

  const [folderTitle, setFolderTitle] = useState("");

  const [color, setColor] = useState("");

  const [searchValue, setSearchValue] = useState("");


  const setPopUpInfo = (color, folderTitle, searchValue) => {
    setColor(color);
    setFolderTitle(folderTitle);
    setSearchValue(searchValue)
    setShowPopUp(true);
  }

  return (
    <div className={WatchlistCSS.Watchlist}>
      <h2>WatchList</h2>
      <div className={WatchlistCSS.Divider}></div>
      <div className={WatchlistCSS.Container}>
        <WatchlistFolder showPopUp={() => setPopUpInfo("#34abeb", "Family Movies", "Family")} title="Family Movies" color="#34abeb"></WatchlistFolder>
        <WatchlistFolder showPopUp={() => setPopUpInfo("#eb4034", "Scary Movies", "Scary")} title="Scary Movies" color="#eb4034"></WatchlistFolder>
        <WatchlistFolder showPopUp={() => setPopUpInfo("#8d996a", "Party Movies", "Party")} title="Party Movies" color="#8d996a"></WatchlistFolder>
        <WatchlistFolder showPopUp={() => setPopUpInfo("#996b6a", "Love", "Sex")} title="Love" color="#996b6a"></WatchlistFolder>
        <AddWatchlistFolder></AddWatchlistFolder>
        {showPopUp ? (
          <WatchlistPopUp
            color={color}
            folderTitle={folderTitle}
            searchValue={searchValue}
            closePopUp={() => setShowPopUp(false)}
          />
        ) : null}
      </div>
    </div>
  );
}
