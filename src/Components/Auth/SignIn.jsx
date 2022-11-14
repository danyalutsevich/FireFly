import React, { useState, useEffect } from "react";
import { SignInWithGoogle } from "./SignInWithGoogle";
import { login } from "../../firebase-config";
import SignInCSS from "./SignIn.module.scss";
import { NavLink } from "react-router-dom";
import { resetPasword } from '../../firebase-config';


export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickHandler = async () => {
    await login(email, password);
  };

  return (
    <div className={SignInCSS.SignIn}>
      <h1>Sign In</h1>
      <input type="text" placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input type="password" placeholder="Enter your password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            clickHandler();
          }
        }}
      />
      <p className={SignInCSS.ResetPassword} onClick={() => { resetPasword(email) }}>Forgot you password?</p>
      <button onClick={clickHandler}>Sign In</button>
      <SignInWithGoogle />
    </div>
  );
}
