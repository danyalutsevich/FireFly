import { useState, useEffect } from "react";
import { TorrentIoLinks } from "../../Variables";

import WebTorrentCSS from "./WebTorrent.module.scss";
import { Loading } from "../Loading";
export function WebTorrent(props) {

    const [streams, setStreams] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const { imdb_id } = props;


    useEffect(() => {
        if (imdb_id) {
            fetch(TorrentIoLinks.byImbdId(imdb_id))
                .then(data => data.json())
                .then(data => { setStreams(data.streams) })
                .then(() => setLoading(false))
        }
    }, [])

    if (loading) {
        // return <div className={WebTorrentCSS.WebTorrent}>Loading...</div>
        return (
            <div className={WebTorrentCSS.WebTorrent} id="webtorrent">
                <Loading />
            </div>)
    }

    return (
        <div className={WebTorrentCSS.WebTorrent} id="webtorrent">
            {/* {loading?"Loading...":"ed"} */}
            {
                streams?.length > 0 ? streams.map((stream, index) => {
                    return (
                        <div className={WebTorrentCSS.Stream} key={index}>
                            <a href={"magnet:?xt=urn:btih:" + stream.infoHash}>{stream.title}</a>
                        </div>
                    )
                }) : <div className={WebTorrentCSS.Stream}>No streams found</div>
            }
        </div>
    )

}