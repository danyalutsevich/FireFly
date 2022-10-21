import React from 'react';
import { NavLink } from 'react-router-dom';

import HeaderCSS from "./Header.module.css";

export default function Header(props) {

    return (
        <div className={HeaderCSS.Header}>
            <NavLink className={HeaderCSS.Logo} to="/">FireFly</NavLink>
            <NavLink to="/ratings">Ratings</NavLink>
            <NavLink to="/liked">Liked</NavLink>
            <NavLink to="/watchList">WatchList</NavLink>
            <NavLink className={HeaderCSS.Profile} to="/profile">{props.username}
                <img src='../obama.jpg'></img>
            </NavLink>
        </div>
    );
}