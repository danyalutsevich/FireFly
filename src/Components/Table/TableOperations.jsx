import React, { useState } from "react";
import { like, saveToWatchlist, addRating } from "../../firebase-config";
import TableOperationsCSS from "./TableOperations.module.scss";

export function TableOperations(props) {

    const {
        filmID,
        liked,
        watchlist,
        rating
    } = props

    console.log(watchlist)

    const ratingRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [rate, setRate] = useState(rating)
    const [isRateClicked, setIsRateClicked] = useState(false)

    return (

        <div className={TableOperationsCSS.SaveTab}>
            <div className={TableOperationsCSS.Stars}>
                {isRateClicked ? ratingRange.map((rate) => {
                    return <span className={`material-symbols-outlined ${rate <= rating ? TableOperationsCSS.Active : TableOperationsCSS.NonActive}`}
                        onClick={() => { addRating(filmID, rate); setIsRateClicked(false) }}>star</span>
                }) :
                    <span className={`material-symbols-outlined ${rating ? TableOperationsCSS.Active : TableOperationsCSS.NonActive}`}
                        onClick={() => { setIsRateClicked(filmID == false ? false : filmID) }}>star</span>
                }
                {rating || ""}
            </div>
            <div className={TableOperationsCSS.Save}>
                <span className={`material-symbols-outlined ${liked ? TableOperationsCSS.Active : TableOperationsCSS.NonActive}`}
                    onClick={() => { like(filmID) }}>favorite</span>
                <span className={`material-symbols-outlined ${watchlist ? TableOperationsCSS.Active : TableOperationsCSS.NonActive}`}
                    onClick={() => { saveToWatchlist(filmID, 'folder') }}>bookmark</span>
            </div>
        </div>


    )


}
