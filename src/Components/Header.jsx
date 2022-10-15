import React from 'react';

export default function Header(props) {

    return (<div>
        <header>
            <h1>FireFly</h1>
            <h2>Ratings</h2>
            <h2>Liked</h2>
            <h2>WatchList</h2>
            <h2>{JSON.stringify(props)}</h2>
        </header>

        Blank Page
    </div>);
}