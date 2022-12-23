import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FirebaseContext, saveToWatchlist } from "../../firebase-config";

import WatchlistCSS from "./Watchlist.module.scss";

const stringToColor = function (str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF - 20;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

export function Watchlist() {
  const contextData = useContext(FirebaseContext);

  const [folders, setWatchlistFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  useEffect(() => {
    setWatchlistFolders(contextData.watchlistFolders);
    console.log("folders: ", folders);
    document.title = "Watchlist";
  }, [contextData])

  return (
    <div className={WatchlistCSS.Watchlist}>
      <h1>WatchList</h1>
      <div className={WatchlistCSS.Divider}></div>
      <div className={WatchlistCSS.Container}>
        {
          folders.map((folder, index) => {
            return (
              <NavLink to={`${folder}`}>
                <div className={WatchlistCSS.Folder} style={{ backgroundColor: stringToColor(folder) }} key={index}>
                  <p>{folder}</p>
                </div>
              </NavLink>
            )
          })
        }
        <div className={WatchlistCSS.Folder} style={{ backgroundColor: stringToColor(contextData.user?.email || "Add") }}>
          <input placeholder="Folder Name" onChange={e => { setNewFolderName(e.target.value) }}
            style={{ backgroundColor: stringToColor(contextData.user?.email || "Add") }}></input>
          <p onClick={() => { saveToWatchlist([], newFolderName) }}>Add</p>
        </div>
      </div>
    </div>
  );
}
