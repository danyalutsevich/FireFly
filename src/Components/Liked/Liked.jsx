import React, {useState} from 'react';

import LikedCSS from "./Liked.module.scss";

import {LikedContentCard} from "../LikedContentCard";

export function Liked() {
  const [sortMethod, setSortMethod] = useState("by date added")
  const [icon, setIcon] = useState("arrow_upward")

  return (
  <div>
    <div className={LikedCSS.LikedHeader}>
      <h2 className={LikedCSS.PageTitle}>Liked</h2>
      <div className={LikedCSS.Sort}>
        
        <button className={LikedCSS.SortIconBtn}>
          <p className={LikedCSS.SortElement}>{sortMethod}<i class="material-icons">{icon}</i></p>
          <i class="material-icons SortIcon">sort</i>
        </button>
        <div className={LikedCSS.DropdownSortMethods}>
          <button className={LikedCSS.SortMethodElement} onClick={() => {setSortMethod("by date added"); setIcon("arrow_upward")}}>by date added<i class="material-icons">arrow_upward</i></button>
          <button className={LikedCSS.SortMethodElement} onClick={() => {setSortMethod("by date added"); setIcon("arrow_downward")}}>by date added<i class="material-icons">arrow_downward</i></button>
          <button className={LikedCSS.SortMethodElement} onClick={() => {setSortMethod("by rating"); setIcon("arrow_upward")}}>by rating<i class="material-icons">arrow_upward</i></button>
          <button className={LikedCSS.SortMethodElement} onClick={() => {setSortMethod("by rating"); setIcon("arrow_downward")}}>by rating<i class="material-icons">arrow_downward</i></button>

        </div>
      </div>
    </div>
    <div className={LikedCSS.Divider}></div>
    <LikedContentCard title = "Hello"/>
  </div>
  );
}