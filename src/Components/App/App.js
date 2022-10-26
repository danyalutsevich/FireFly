import React from "react";

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

import AppCSS from "./App.module.scss";

import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Header username={"Martin Scorsese"} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchValue" element={<Search />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/watchList" element={<Watchlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
