import React from "react";
import Links from "../../Variables";
import FooterCSS from "./Footer.module.scss";

export function Footer() {
  return (
    <div className={FooterCSS.Footer}>
      <div className={FooterCSS.Footer_Links}>
        <p className={FooterCSS.Link}>
          <a href="https://www.themoviedb.org/">IMDb Movie Database</a>
        </p>
        <p className={FooterCSS.Link}>
          <a href="https://github.com/danyalutsevich/FireFly">GitHub</a>&nbsp;
        </p>
        <p className={FooterCSS.Link}>
          <a href="https://send.monobank.ua/jar/7c9hzdU5Q9">Support Us</a>
        </p>
      </div>
      <p className={FooterCSS.Issue}>
        <span>You can report a bug by opening an issue on our github</span>
      </p>
      <br />
      <div className={FooterCSS.FireFly}>
        <p>
          <span>© {new Date().getFullYear()}</span> FireFly
        </p>
      </div>
    </div>
  );
}
