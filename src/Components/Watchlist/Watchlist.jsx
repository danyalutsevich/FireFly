import React,{useEffect,useState,useContext} from 'react';
import {auth, FirebaseContext} from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { CRUDexample } from '../Profile/CRUDexample';

export function Watchlist() {

  const contextVal = useContext(FirebaseContext)

 
  return (
  <div>
    <h1>WatchList</h1>
    <h2>{JSON.stringify(contextVal)}</h2>

  </div>
  );
}