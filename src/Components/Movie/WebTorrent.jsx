import { useState, useEffect } from "react";
import { TorrentIoLinks } from "../../Variables";

import WebTorrentCSS from "./WebTorrent.module.scss";

export function WebTorrent(props) {

    const [streams, setStreams] = useState(undefined);
    const { imdb_id } = props;


    useEffect(() => {
        if (imdb_id) {
            fetch(TorrentIoLinks.byImbdId(imdb_id))
                .then(data => data.json())
                .then(data => { setStreams(data.streams) })
        }
    }, [])

    return (
        <div className={WebTorrentCSS.WebTorrent} id="webtorrent">
            {
                streams && streams.map((stream, index) => {
                    return (
                        <div className={WebTorrentCSS.Stream} key={index}>
                            <a href={"magnet:?xt=urn:btih:" + stream.infoHash}>{stream.title}</a>
                        </div>
                    )
                })
            }
        </div>
    )

}