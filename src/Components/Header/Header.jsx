import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import HeaderCSS from "./Header.module.scss";
import { FirebaseContext, logout } from "../../firebase-config";
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
            autoComplete="off"
            onFocus={() => {
              setInputIsFocused(true);
            }}
            onBlur={() => {
              setTimeout(() => setInputIsFocused(false), 200);
            }}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchValue !== "") {
                window.location.href = "/search/" + searchValue + "/1";
              }
            }}
          ></input>
          <NavLink
            className={HeaderCSS.MenuItem}
            to={searchValue === "" ? "#" : `/search/${searchValue}/1`}
          >
            <i className="material-icons">search</i>
          </NavLink>
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
        <NavLink className={HeaderCSS.MenuItem} to="/liked">
          Liked
        </NavLink>
      ) : null}
      {user ? (
        <NavLink className={HeaderCSS.MenuItem} to="/watchlist">
          WatchList
        </NavLink>
      ) : null}
      {user ? (
        <div className={HeaderCSS.Dropdown}>
          <button>
            <div className={HeaderCSS.Profile}>
              <object data={user.photoURL || "https://"} type="image/jpg">
                <img src={"/defaultUserPic.svg"} alt="Profile" />
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
        // <div className={HeaderCSS.Profile}>
        //   <button className={HeaderCSS.DropDownBtn}>
        //     {user.displayName}{" "}
        //     <object data={user.photoURL || "https://"} type="image/jpg">
        //       // <img src={"/defaultUserPic.svg"} alt="Profile" />
        //       //{" "}
        //     </object>
        //   </button>
        //   <div class={HeaderCSS.DropDownContent}>
        //     <a href="#">Ссылка 1</a>
        //     <a href="#">Ссылка 2</a>
        //     <a href="#">Ссылка 3</a>
        //   </div>
        // </div>
        // <NavLink to="/profile" className={HeaderCSS.Profile}>
        //   {user.displayName}
        //   <object data={user.photoURL || "https://"} type="image/jpg">
        //     <img src={"/defaultUserPic.svg"} alt="Profile" />
        //   </object>
        // </NavLink>
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
