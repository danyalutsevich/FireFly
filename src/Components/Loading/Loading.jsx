import React from "react";
import LoadingCSS from "./Loading.module.scss";

export function Loading() {
  return (
    <div class={LoadingCSS.Loading}>
      <div class={LoadingCSS.wave}></div>
      <div class={LoadingCSS.wave}></div>
      <div class={LoadingCSS.wave}></div>
      <div class={LoadingCSS.wave}></div>
      <div class={LoadingCSS.wave}></div>
      <div class={LoadingCSS.wave}></div>
      <div class={LoadingCSS.wave}></div>
      <div class={LoadingCSS.wave}></div>
      <div class={LoadingCSS.wave}></div>
      <div class={LoadingCSS.wave}></div>
    </div>
  );
}
