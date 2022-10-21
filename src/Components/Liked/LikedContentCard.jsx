import React from 'react';

import LikedContentCardCSS from "./LikedContentCard.module.css";

export default function LikedContentCard(props) {

    return (<div>

        <div>
            <h1>{props.title}</h1>
        </div>

    </div>);
}