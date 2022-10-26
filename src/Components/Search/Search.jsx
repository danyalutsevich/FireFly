import React, { useState, useEffect } from "react";
import { MovieDBLinks } from "../../Variables";
import { NavLink } from "react-router-dom";

import SearchCSS from "./Search.module.scss";

export function Search(props) {
  return (
    <div className={SearchCSS.Search}>
        <h1>{props.searchValue}</h1>
    </div>
  );
}
