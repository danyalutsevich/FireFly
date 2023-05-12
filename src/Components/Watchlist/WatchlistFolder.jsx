import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { FirebaseContext, deleteFolder } from "../../firebase-config";
import { LikedContentCard } from "../Liked";

import WatchlistFolderCSS from "./WatchlistFolder.module.scss";

export function WatchlistFolder() {
    const { folder } = useParams();

    const contextData = useContext(FirebaseContext);
    const [liked, setLiked] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [user, setUser] = useState(null);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        setLiked(contextData.liked);
        setWatchlist(contextData.watchlist);
        setUser(contextData.user);
        setRatings(contextData.ratings);
        document.title = folder;
        document.querySelector('meta[name="description"]').setAttribute("content", `Here you can find films saved to your WatchlistFolder`)
        document.querySelector('meta[property="og:description"]').setAttribute("content", `Here you can find films saved to your WatchlistFolder`)
        document.querySelector('meta[property="og:title"]').setAttribute("content", "WatchlistFolder")
    }, [contextData]);

    if (!watchlist[folder]) {
        return (
            <div className={WatchlistFolderCSS.NoWatchlistFolderFilms}>
                <h1>There is no such folder</h1>
            </div>
        )
    }

    return (
        <div className={WatchlistFolderCSS.WatchlistFolder}>
            <div className={WatchlistFolderCSS.Title}>
                <h1>{folder}</h1>
                <span class="material-symbols-outlined" onClick={() => { deleteFolder(folder) }}>
                    delete
                </span>
            </div>
            <hr></hr>
            <div className={WatchlistFolderCSS.Folders}>
                {watchlist[folder] == 0 ?
                    <div className={WatchlistFolderCSS.NoWatchlistFolderFilms}>
                        <h1>Your films <br />will appear here</h1>
                    </div>
                    :
                    (watchlist[folder] || []).map((id) => {
                        if (id) {

                            return (
                                <LikedContentCard
                                    filmID={id}
                                    liked={liked?.includes(Number(id))}
                                    watchlist={Object.values(watchlist).flat().includes(Number(id))}
                                    rating={ratings[id]}
                                    user={user}
                                    key={id}
                                />
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
