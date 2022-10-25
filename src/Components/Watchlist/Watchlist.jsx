import React,{useEffect,useState} from 'react';
import {auth} from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

export function Watchlist() {
  

  const [user, setUser] = useState({})

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{ setUser(user)})
    setUser(auth.currentUser)
    console.log(auth.currentUser)
  },[])

  return (
  <div>
    <h1>WatchList</h1>
    <h2>{user?.email}</h2>
  </div>
  );
}