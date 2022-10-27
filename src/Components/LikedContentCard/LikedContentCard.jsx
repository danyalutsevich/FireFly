import React, {useState} from 'react';
import { NavLink } from "react-router-dom";

import LikedContentCardCSS from "./LikedContentCard.module.scss";

export function LikedContentCard(props) {

    return (<div className={LikedContentCardCSS["Content-card"]} key={props.key}>
            <img src={props.imgSrc} alt={props.key}></img>
            <div>
                <span className={LikedContentCardCSS["more-info"]}>
                    <button className={LikedContentCardCSS["more-info-button"]}><i className="material-icons">more_horiz</i></button>
                    <span className={LikedContentCardCSS["dropdown"]}>
                        <button className={LikedContentCardCSS["more-info-element"]}>Перейти куда-то</button>
                        <button className={LikedContentCardCSS["more-info-element"]}>Перейти куда-то еще</button>
                    </span>
                </span>
                <button className={LikedContentCardCSS["save-button"]}><i className={`material-icons`}>favorite</i></button>
            </div>
    </div>);
}