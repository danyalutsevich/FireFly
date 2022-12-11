import React, { useState, useEffect, useContext } from "react"
import { saveToWatchlist, FirebaseContext } from "../../firebase-config"

import ChooseFolderCSS from "./ChooseFolder.module.scss"

export const ChooseFolder = (props) => {

    const {
        filmID,
        setChooseFolder
    } = props

    const contextData = useContext(FirebaseContext)

    const [folders, setFolders] = useState([])
    const [newFolder, setNewFolder] = useState("")

    useEffect(() => {
        setFolders(Object.keys(contextData.watchlist).sort())
    }, [contextData])


    return (
        <div className={ChooseFolderCSS.ChooseFolder}>
            <div className={ChooseFolderCSS.Head}>
                <h1>Choose Folder</h1>
                <span className="material-symbols-outlined" onClick={() => { setChooseFolder(false) }}>
                    close
                </span>
            </div>
            <div className={ChooseFolderCSS.Folders}>
                {
                    folders?.map((folder, index) =>
                        <div className={ChooseFolderCSS.Folder} key={index}
                            onClick={() => { saveToWatchlist(filmID, folder) }}>
                            <p>{folder}</p>
                            {contextData.watchlist[folder].includes(Number(filmID)) && <span className="material-symbols-outlined">check</span>}
                        </div>
                    )
                }
                <div className={ChooseFolderCSS.AddFolder}>
                    <input placeholder="Add folder" onChange={(e) => { setNewFolder(e.target.value) }} />
                    <span className="material-symbols-outlined"
                        onClick={() => { saveToWatchlist(filmID, newFolder); setNewFolder("") }}
                    >add</span>
                </div>
            </div>

        </div>
    );

}




