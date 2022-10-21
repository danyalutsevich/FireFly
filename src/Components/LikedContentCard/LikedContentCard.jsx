import React, {useState} from 'react';

import LikedContentCardCSS from "./LikedContentCard.module.scss";

export function LikedContentCard(props) {

    return (<div>

        <div className={LikedContentCardCSS["content-card"]} key={props.key}>
            <img className={LikedContentCardCSS["liked-film-img"]} src={props.imgSrc} alt={props.key}></img>
            <div className={LikedContentCardCSS["additional-info"]}>
                <div className={LikedContentCardCSS["more-info"]}>
                    <button className={LikedContentCardCSS["more-info-button"]}><i className="material-icons more_horiz-icon">more_horiz</i></button>
                    <div className={LikedContentCardCSS["dropdown-more-info"]}>
                        <button className={LikedContentCardCSS["more-info-element"]}>Перейти куда-то</button>
                        <button className={LikedContentCardCSS["more-info-element"]}>Перейти куда-то еще</button>
                    </div>
                </div>
                <button className={LikedContentCardCSS["save-button"]}><i className={`material-icons ${LikedContentCardCSS["heart-icon"]}`}>favorite</i></button>
            </div>
        </div>

    </div>);
}