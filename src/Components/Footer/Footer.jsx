import React from "react";
import Links from "../../Variables";
import FooterCSS from "./Footer.module.scss";

export function Footer() {
  return (
      <div className={FooterCSS.Footer}>
      <hr/>
        
        <p><span>© {new Date().getFullYear()}</span> FireFly,IMDb <a href="https://www.themoviedb.org/">Movie Database</a>
          </p>
          <br>
          </br>
        <a href="https://github.com/danyalutsevich/FireFly">GitHub</a>&nbsp;<a>LinkedIn</a>
        
      </div>
    

  );
}
