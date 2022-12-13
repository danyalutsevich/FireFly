import React, { useState, useEffect, useContext, useRef } from "react"
import { saveToWatchlist, FirebaseContext } from "../../firebase-config"

import ChooseFolderCSS from "./ChooseFolder.module.scss"

function useOutsideAlerter(ref, action) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                action()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export const ChooseFolder = (props) => {

    const {
        filmID,
        setChooseFolder
    } = props

    const folderInput = useRef(null)
    const chooseFolderWindow = useRef(null)
    const contextData = useContext(FirebaseContext)

    const [folders, setFolders] = useState([])
    const [newFolder, setNewFolder] = useState("")

    useEffect(() => {
        setFolders(contextData.watchlistFolders)
    }, [contextData])

    useOutsideAlerter(chooseFolderWindow, () => { setChooseFolder(false) })

    return (
        <div className={ChooseFolderCSS.ChooseFolder} ref={chooseFolderWindow}>
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
                    <input placeholder="Add folder" ref={folderInput} onChange={(e) => { setNewFolder(e.target.value) }} />
                    <span className="material-symbols-outlined"
                        onClick={() => { saveToWatchlist(filmID, newFolder); folderInput.current.value = ""; setNewFolder("") }}
                    >add</span>
                </div>
            </div>

        </div>
    );

}




