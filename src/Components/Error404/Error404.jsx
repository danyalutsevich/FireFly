import React from "react";
import Links from "../../Variables";
import Error404CSS from "./Error404.module.scss";

export function Error404() {
  return (
    <div className={Error404CSS.Error404}>
      <h2>Error404 Page not found</h2>
      <img className={Error404CSS.monkey} src="/monkey404.gif" alt="404 gif"></img>
    </div>
  );
}
