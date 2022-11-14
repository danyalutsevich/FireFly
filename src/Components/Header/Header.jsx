import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import HeaderCSS from "./Header.module.scss";
import { FirebaseContext } from "../../firebase-config";

export function Header(props) {
  const [searchValue, setSearchValue] = useState("");

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
        <input
          type="search"
          name="searchInput"
          className={HeaderCSS.searchInput}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchValue !== "") {
              window.location.href = "/search/" + searchValue + "/1";
            }
          }}
        ></input>
        <NavLink to={searchValue === "" ? "#" : `/search/${searchValue}/1`}>
          <i className="material-icons">search</i>
        </NavLink>
      </div>
      <NavLink to="/ratings/1">RATINGS</NavLink>
      {user ? <NavLink to="/liked">LIKED</NavLink> : null}
      {user ? <NavLink to="/watchList">WATCHLIST</NavLink> : null}
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
            SIGN IN
          </NavLink>
          <NavLink to="/signup" className={HeaderCSS.SignUp}>
            SIGN UP
          </NavLink>
        </div>
      )}
    </div>
  );
}
