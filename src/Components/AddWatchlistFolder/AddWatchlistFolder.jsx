import React, { useEffect, useState, useContext } from 'react';
import { auth, FirebaseContext } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { CRUDexample } from '../Profile/CRUDexample';

import AddWatchlistFolderCSS from "./AddWatchlistFolder.module.scss";


export function AddWatchlistFolder() {
  return (
    <div className={AddWatchlistFolderCSS.AddWatchlistFolder}>
        <div>
            <i className='material-icons'>add</i>
            <div>Add</div>
        </div>
    </div>
  );
}