import React from "react";
import Links from "../../Variables";
import FooterCSS from "./Footer.module.scss";

export function Footer() {
  return (
    <div className={FooterCSS.Footer}>
      <div className={FooterCSS.Footer_Links}>
        <p className={FooterCSS.Link}>
          <a href="https://www.themoviedb.org/">TMDb Movie Database</a>
        </p>
        <p className={FooterCSS.Link}>
          <a href="https://github.com/danyalutsevich/FireFly">GitHub</a>&nbsp;
        </p>
        <p className={FooterCSS.Link}>
          <a href="https://send.monobank.ua/jar/7c9hzdU5Q9">Support Us</a>
        </p>
      </div>
      <p className={FooterCSS.Issue}>
        <span>You can report a bug by opening an issue in our GitHub</span>
      </p>
      <div className={FooterCSS.DownloadTorrent}>
        <p>In order to watch films you should download </p>
        <a className={FooterCSS.Description} href="https://www.utorrent.com/web/"> WebTorrent</a>
        <a className={FooterCSS.Win} href="https://download-new.utorrent.com/endpoint/utweb/track/stable/os/win"> Win </a>
        <a className={FooterCSS.Mac} href="https://utweb-assets.bittorrent.com/installer/uTorrentWeb.dmg"> Mac </a>
      </div>
      <div className={FooterCSS.FireFly}>
        <p>
          <span>© {new Date().getFullYear()}</span> FireFly
        </p>
      </div>
    </div>
  );
}
