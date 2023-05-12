import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FirebaseContext, saveToWatchlist } from "../../firebase-config";

import WatchlistCSS from "./Watchlist.module.scss";

const stringToColor = function (str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & (0xff - 20);
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

export function Watchlist() {
  const contextData = useContext(FirebaseContext);

  const [folders, setWatchlistFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  useEffect(() => {
    setWatchlistFolders(contextData.watchlistFolders);
    console.log("folders: ", folders);
    document.title = "Watchlist";
    document.querySelector('meta[name="description"]').setAttribute("content", `Here you can find films saved to your watchlist`)
    document.querySelector('meta[property="og:description"]').setAttribute("content", `Here you can find films saved to your watchlist`)
    document.querySelector('meta[property="og:title"]').setAttribute("content", "Watchlist")
  }, [contextData]);

  return (
    <div className={WatchlistCSS.Watchlist}>
      <div className={WatchlistCSS.WatchlistHeader}>
        <h1>WatchList</h1>
        <div>
          <div>
            <input
              maxLength={20}
              type="input"
              id="name"
              placeholder="Name"
              value={newFolderName}
              onChange={(e) => {
                setNewFolderName(e.target.value);
              }}
            />
            <label for="name">
              Folder Name
            </label>
          </div>
          <button
            onClick={() => {
              saveToWatchlist([], newFolderName); setNewFolderName("")
            }}
          >
            Create
          </button>
        </div>
      </div>
      <div className={WatchlistCSS.Divider}></div>
      <div className={WatchlistCSS.Container}>
        {folders.map((folder, index) => {
          return (
            <div className={WatchlistCSS.FolderWrapper}>
            <NavLink to={`${folder}`}>
              <div
                className={WatchlistCSS.Folder}
                style={{ backgroundColor: '#424242' }}
                key={index}
              >
                <p>{folder}</p>
              </div>
            </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
