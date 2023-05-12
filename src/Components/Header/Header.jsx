import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import HeaderCSS from "./Header.module.scss";
import { FirebaseContext, logout, addSearch } from "../../firebase-config";
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
    <div className={HeaderCSS.Header} id="header">
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
            autoComplete="off"
            onFocus={() => {
              setInputIsFocused(true);
            }}
            onBlur={() => {
              setTimeout(() => setInputIsFocused(false), 200);
            }}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && searchValue !== "") {
                await addSearch(searchValue);
                window.location.href = "/search/" + searchValue + "/1";
              }
            }}
          ></input>
          <span className={HeaderCSS.SearchIcon}>
          <NavLink
            className={HeaderCSS.MenuItem}
            to={searchValue === "" ? "#" : `/search/${searchValue}/1`}
          >
            
          </NavLink>
          </span>
        </div>
        
        <SearchResults
          searchValue={searchValue}
          isActive={inputIsFocused}
        ></SearchResults>
      </div>
      <NavLink className={HeaderCSS.MenuItem} to="/ratings/1">
        Ratings
      </NavLink>
      {user ? (
        <>
          <NavLink className={HeaderCSS.MenuItem} to="/liked">
            Liked
          </NavLink>
          <NavLink className={HeaderCSS.MenuItem} to="/watchlist">
            Watchlist
          </NavLink>
        </>
      ) : null}
      {user ? (
        <div className={HeaderCSS.Dropdown}>
          <button onClick={() => (window.location.href = "/profile")}>
            <div className={HeaderCSS.Profile}>
              <object data={user.photoURL || "https://"} type="image/jpg">
                <img
                  src={"/defaultUserPic.svg"}
                  alt={user.displayName + " profile pic"}
                />
              </object>
            </div>
          </button>
          <div className={HeaderCSS.DropdownContent}>
            <a>
              Signed in as <b>{user.displayName}</b>
            </a>
            <a href="/profile">Profile</a>
            <a href="#" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
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
        <a href="#header" className={HeaderCSS.GoUp+" material-symbols-outlined"}>
          arrow_upward
        </a>
    </div>
  );
}
