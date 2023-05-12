import React, { useEffect, useState } from "react";

import { Header } from "../Header";
import { Home } from "../Home";
import { Ratings } from "../Ratings";
import { Liked } from "../Liked";
import { Watchlist } from "../Watchlist";
import { WatchlistFolder } from "../Watchlist";
import { Profile } from "../Profile";
import { Error404 } from "../Error404";
import { Movie } from "../Movie";
import { Footer } from "../Footer";
import { Search } from "../Search";
import { SignIn } from "../Auth";
import { SignUp } from "../Auth";
import { Person } from "../Person";

import { FirebaseContextProvider } from "../../firebase-config";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

import AppCSS from "./App.module.scss";

export function App() {
  return (
    <FirebaseContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home/:page" element={<Home />} />
          <Route path="/person/:id" element={<Person />} />
          <Route path="/search/:searchValue" element={<Search />} />
          <Route path="/search/:searchValue/:page" element={<Search />} /> {/* useParams hook will return {searchValue, page} */}
          <Route path="/ratings/:page" element={<Ratings />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/watchlist/:folder" element={<WatchlistFolder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<Movie media_type="movie" />} />
          <Route path="/tv/:id" element={<Movie media_type="tv" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </FirebaseContextProvider>
  );
}
