import React from 'react';

import "./Liked.css";


export default function Liked() {
  return (
  <div>
    <div className="LikedHeader">
      <h2 className="PageTitle">Liked</h2>
      <div className="Sort">
        
        <button className="SortIconBtn">
        <h3 className="SortElement">sort</h3>
          <i class="material-icons SortElement">sort</i>
        </button>
        <div className="DropdownSortMethods">
          <button className="SortMethodElement">by date added<i class="material-icons">arrow_upward</i></button>
          <button className="SortMethodElement">by date added<i class="material-icons">arrow_downward</i></button>
          <button className="SortMethodElement">by rating<i class="material-icons">arrow_upward</i></button>
          <button className="SortMethodElement">by rating<i class="material-icons">arrow_downward</i></button>

        </div>
      </div>
    </div>
    <div className="Divider"></div>
  </div>
  );
}