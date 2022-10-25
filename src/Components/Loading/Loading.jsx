import React from "react";
import LoadingCSS from "./Loading.module.scss";

export function Loading() {
  return (
    <div className={LoadingCSS.Loading}>
      <div className={LoadingCSS.wave}></div>
      <div className={LoadingCSS.wave}></div>
      <div className={LoadingCSS.wave}></div>
      <div className={LoadingCSS.wave}></div>
      <div className={LoadingCSS.wave}></div>
      <div className={LoadingCSS.wave}></div>
      <div className={LoadingCSS.wave}></div>
      <div className={LoadingCSS.wave}></div>
      <div className={LoadingCSS.wave}></div>
      <div className={LoadingCSS.wave}></div>
    </div>
  );
}
