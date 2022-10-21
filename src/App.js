import React from 'react';

import Header from './Components/Header';
import Home from './Components/Home';
import Ratings from './Components/Ratings';
import Liked from './Components/Liked';
import WatchList from './Components/Watchlist';
import Profile from './Components/Profile';
import Error404 from './Components/Error404';

import "./Components/App.css";

import { useState } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';


function App() {

  // const [username, setUsername] = useState("")
  // setUsername("Martin Scorsese")

  return (
    <div>

    <BrowserRouter>
      <div>
        <Header username={"Martin Scorsese"} />
      <Routes>
        <Route path="/" element={<Home/>}  />
        <Route path="/ratings" element={<Ratings/>}  />
        <Route path="/liked" element={<Liked/>}  />
        <Route path="/watchList" element={<WatchList/>}  />
        <Route path="/profile" element={<Profile/>}  />
        <Route path="*" element={<Error404/>}  />
      </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
