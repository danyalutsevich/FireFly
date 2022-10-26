import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import HeaderCSS from "./Header.module.scss";

export function Header(props) {
    const [searchValue, setSearchValue] = useState('');
    return (
        <div className={HeaderCSS.Header}>
            <NavLink className={HeaderCSS.Logo} to="/">FireFly</NavLink>
            <div className={HeaderCSS.Search}>
            <NavLink to="/search"><button><i className='material-icons'>search</i></button></NavLink>
            <input type="text" name="seearchInput" value={searchValue} onChange={(event) => setSearchValue(event.target.value)}></input>
            </div>
            <NavLink to="/ratings">Ratings</NavLink>
            <NavLink to="/liked">Liked</NavLink>
            <NavLink to="/watchList">WatchList</NavLink>
            <NavLink className={HeaderCSS.Profile} to="/profile">{props.username}
                <img src='../obama.jpg'></img>
            </NavLink>
        </div>
    );
}