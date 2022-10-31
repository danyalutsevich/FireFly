import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import HeaderCSS from "./Header.module.scss";
import { FirebaseContext } from '../../firebase-config';


export function Header(props) {
    const [searchValue, setSearchValue] = useState('');

    const ContextData = useContext(FirebaseContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(ContextData)
        console.log(ContextData)
    }, [ContextData]);

    return (
        <div className={HeaderCSS.Header}>
            <NavLink className={HeaderCSS.Logo} to="/">FireFly</NavLink>
            <div className={HeaderCSS.Search}>
                <input type="text" name="searchInput" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}></input>
                <NavLink to={`/search/${searchValue}/1`} onClick={() => {setSearchValue('')}}>
                    <i className='material-icons'>search</i>
                </NavLink>
            </div>
            <NavLink to="/ratings/1">Ratings</NavLink>
            <NavLink to="/liked">Liked</NavLink>
            <NavLink to="/watchList">WatchList</NavLink>
            {user ?
                <NavLink to="/profile" className={HeaderCSS.Profile}>
                    {user.displayName}
                    <img src={user.photoURL} alt="Profile" />
                </NavLink> :
                <div className={HeaderCSS.Auth}>
                    <NavLink to="/signin" className={HeaderCSS.SignIn}>SignIn</NavLink>
                    <NavLink to="/signup" className={HeaderCSS.SignUp}>SignUp</NavLink>
                </div>
            }

        </div>
    );
}