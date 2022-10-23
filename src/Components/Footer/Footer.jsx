import React from "react";
import Links from "../../Variables";
import FooterCSS from "./Footer.module.scss";

export function Footer() {
  return (
    <div>
      <div>
        <div>
          <a>IMDb</a>
          <a>The Movie Database</a>
        </div>
        <div>
          <a>GitHub</a>
          <a>LinkedIn</a>
        </div>
      </div>
    </div>
  );
}
