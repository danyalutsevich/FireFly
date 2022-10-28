import React, { useEffect, useState } from "react";

import { Header } from "../Header";
import { Home } from "../Home";
import { Ratings } from "../Ratings";
import { Liked } from "../Liked";
import { Watchlist } from "../Watchlist";
import { Profile } from "../Profile";
import { Error404 } from "../Error404";
import { Movie } from "../Movie";
import { Footer } from "../Footer";
import { Search } from "../Search";
import { SignIn } from "../Auth";
import { SignUp } from "../Auth";

import { FirebaseContextProvider } from "../../firebase-config";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

import AppCSS from "./App.module.scss";

export function App() {

  return (
    <FirebaseContextProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:searchValue" element={<Search />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/watchList" element={<Watchlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </FirebaseContextProvider>
  );
}
