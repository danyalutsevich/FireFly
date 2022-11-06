import React, { useEffect, useState, useContext } from 'react';
import { auth, FirebaseContext } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { CRUDexample } from '../Profile/CRUDexample';

import WatchlistFolderCSS from "./WatchlistFolder.module.scss";


export function WatchlistFolder(props) {


  return (
    <div className={WatchlistFolderCSS.WatchlistFolder} style={{backgroundColor: props.color}}>
        <span>{props.title}</span>
    </div>
  );
}