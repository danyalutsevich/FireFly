import React from 'react';
import { NavLink } from 'react-router-dom';

import "./Header.css";

export default function Header(props) {

    return (<div>

        <div className="Header">
            <div className="NavElement Logo">
                <NavLink to="/">FireFly</NavLink>
            </div>
            <div className="NavElement">
                <NavLink to="/ratings">Ratings</NavLink>
            </div>
            <div className="NavElement">
                <NavLink to="/liked">Liked</NavLink>
            </div>
            <div className="NavElement">
                <NavLink to="/watchList">WatchList</NavLink>
            </div>
            <div className="NavElement">
                <NavLink to="/profile">{props.username}</NavLink>
            </div>
                <img src='../obama.jpg'></img>
        </div>

    </div>);
}