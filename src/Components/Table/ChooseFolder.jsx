import React, { useState, useEffect, useContext } from "react"
import { saveToWatchlist, FirebaseContext } from "../../firebase-config"

import ChooseFolderCSS from "./ChooseFolder.module.scss"

export const ChooseFolder = (props) => {

    const {
        filmID,
        setChooseFolder
    } = props

    const contextData = useContext(FirebaseContext)
    console.log(contextData)

    return (
        <div className={ChooseFolderCSS.ChooseFolder}>

            <span class="material-symbols-outlined"
                onClick={() => { setChooseFolder(false) }}
            >
                close
            </span>
            <div>
                {

                    <div className={ChooseFolderCSS.Folder}>

                    </div>
                }
            </div>

        </div>
    );

}




