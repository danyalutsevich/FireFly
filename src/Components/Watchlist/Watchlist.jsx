import React, { useEffect, useState, useContext } from 'react';
import { auth, FirebaseContext } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { CRUDexample } from '../Profile/CRUDexample';

import WatchlistCSS from "./Watchlist.module.scss";

import {WatchlistFolder} from "../WatchlistFolder";
import {AddWatchlistFolder} from "../AddWatchlistFolder";


export function Watchlist() {

  const contextVal = useContext(FirebaseContext)


  return (
    <div className={WatchlistCSS.Watchlist}>
      <h2>WatchList</h2>
      <div className={WatchlistCSS.Divider}></div>
      <div className={WatchlistCSS.Container}>
        <WatchlistFolder title="Family Movies" color="#34abeb"></WatchlistFolder>
        <WatchlistFolder title="Scary Movies" color="#eb4034"></WatchlistFolder>
        <WatchlistFolder title="Party Movies" color="#8d996a"></WatchlistFolder>
        <WatchlistFolder title="Love" color="#996b6a"></WatchlistFolder>
        <AddWatchlistFolder></AddWatchlistFolder>
      </div>
    </div>
  );
}