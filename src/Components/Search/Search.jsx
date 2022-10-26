import React, { useState, useEffect } from "react";
import { MovieDBLinks } from "../../Variables";
import { NavLink, useParams } from "react-router-dom";

import SearchCSS from "./Search.module.scss";

export function Search(props) {

  const params = useParams()
  console.log(params)

  return (
    <div className={SearchCSS.Search}>
        <h1>{params.searchValue}</h1>
    </div>
  );
}
