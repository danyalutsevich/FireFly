import { useState, useEffect } from "react";
import { TorrentIoLinks } from "../../Variables";

import WebTorrentCSS from "./WebTorrent.module.scss";

export function WebTorrent(props) {

    const [streams, setStreams] = useState(undefined);
    const [showTorrents, setShowTorrents] = useState(false);
    const { imdbId } = props;


    useEffect(() => {
        if (imdbId) {
            fetch(TorrentIoLinks.byImbdId(imdbId))
                .then(data => data.json())
                .then(data => { setStreams(data.streams) })
        }
    }, [])

    return (
        <div className={WebTorrentCSS.WebTorrent}>
            {
                streams && showTorrents && streams.map((stream, index) => {
                    return (
                        <div className={WebTorrentCSS.Stream} key={index}>
                            <a href={"magnet:?xt=urn:btih:" + stream.infoHash}>{stream.title}</a>
                        </div>
                    )
                })
            }
            <button onClick={() => setShowTorrents(!showTorrents)}>{showTorrents ? "Hide" : "Show"} Torrents</button>
           
        </div>
    )

}