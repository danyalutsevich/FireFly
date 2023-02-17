import React, { useState, useEffect } from "react";

import { SignInWithGoogle } from "./SignInWithGoogle";
import SignUpCSS from "./SignUp.module.scss";
import { register, uploadImage } from "../../firebase-config";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    document.title = "Sign Up";
    document.querySelector('meta[name="description"]').setAttribute("content", `Here you can Sign Up it gives you access to your Watchlist and to your Ratings also you will be able save films`)
    document.querySelector('meta[property="og:description"]').setAttribute("content", `Here you can Sign Up it gives you access to your Watchlist and to your Ratings also you will be able save films`)
    document.querySelector('meta[property="og:title"]').setAttribute("content", "Sign up")
  }, []);

  const clickHandler = async () => {
    await register(email, password, name);
  };

  return (
    <div className={SignUpCSS.SignUp}>
      <h1>SignUp</h1>
      <input
        type="text"
        placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Enter your password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            clickHandler();
          }
        }}
      />
      <button onClick={clickHandler}>Sign Up</button>
      <SignInWithGoogle />
    </div>
  );
}
