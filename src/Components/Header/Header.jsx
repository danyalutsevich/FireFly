import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import HeaderCSS from "./Header.module.scss";
import { FirebaseContext } from "../../firebase-config";

import { SearchResults } from "../SearchResults";

export function Header(props) {
  const [searchValue, setSearchValue] = useState("");
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const contextData = useContext(FirebaseContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(contextData.user);
    console.log(contextData);
  }, [contextData]);

  return (
    <div className={HeaderCSS.Header}>
      <NavLink className={HeaderCSS.Logo} to="/">
        FireFly
      </NavLink>
      <div className={HeaderCSS.Search}>
        <div className={HeaderCSS.SearchInput}>
          <input
            type="search"
            name="searchInput"
            className={HeaderCSS.searchInput}
            value={searchValue}
            autoComplete='off'
            onFocus={() => {setInputIsFocused(true)}}
            onBlur={() => {setTimeout(() =>setInputIsFocused(false), 200)}}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchValue !== "") {
                window.location.href = "/search/" + searchValue + "/1";
              }
            }}
          ></input>
          <NavLink className={HeaderCSS.MenuItem} to={searchValue === "" ? "#" : `/search/${searchValue}/1`}>
            <i className="material-icons">search</i>
          </NavLink>
        </div>
        <SearchResults searchValue={searchValue} isActive={inputIsFocused}></SearchResults>
      </div>
      <NavLink className={HeaderCSS.MenuItem} to="/ratings/1">Ratings</NavLink>
      {user ? <NavLink className={HeaderCSS.MenuItem} to="/liked">Liked</NavLink> : null}
      {user ? <NavLink className={HeaderCSS.MenuItem} to="/watchlist">WatchList</NavLink> : null}
      {user ? (
        <NavLink to="/profile" className={HeaderCSS.Profile}>
          {user.displayName}
          <object data={user.photoURL || "https://"} type="image/jpg">
            <img src={"/defaultUserPic.svg"} alt="Profile" />
          </object>
        </NavLink>
      ) : (
        <div className={HeaderCSS.Auth}>
          <NavLink to="/signin" className={HeaderCSS.SignIn}>
            SignIn
          </NavLink>
          <NavLink to="/signup" className={HeaderCSS.SignUp}>
            SignUp
          </NavLink>
        </div>
      )}
    </div>
  );
}
