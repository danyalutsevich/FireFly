import React, {useState} from 'react';

import "./LikedContentCard.css";

export default function LikedContentCard(props) {

    return (<div>

        <div className="content-card" key={props.key}>
            <img className='liked-film-img' src={props.imgSrc} alt={props.key}></img>
            <div className="additional-info">
                <div className="more-info">
                    <button className="more-info-button"><i class="material-icons more_horiz-icon">more_horiz</i></button>
                    <div className="dropdown-more-info">
                        <button className="more-info-element">Перейти куда-то</button>
                        <button className="more-info-element">Перейти куда-то еще</button>
                    </div>
                </div>
                <button className="save-button"><i class="material-icons heart-icon">favorite</i></button>
            </div>
            
        </div>

    </div>);
}