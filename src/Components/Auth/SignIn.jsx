import React, { useState, useEffect } from "react";
import { SignInWithGoogle } from "./SignInWithGoogle";
import { login } from "../../firebase-config";
import SignInCSS from "./SignIn.module.scss";
import { NavLink } from "react-router-dom";
import { resetPasword } from '../../firebase-config';


export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState(false);

  const clickHandler = async () => {
    resetPassword ? await resetPasword(email) : await login(email, password);
    setResetPassword(false);
  };

  return (
    <div className={SignInCSS.SignIn}>
      <h1>{resetPassword ? "Reset password" : "Sign In"}</h1>
      <input type="text" placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {resetPassword || <input type="password" placeholder="Enter your password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            clickHandler();
          }
        }}
      />}
      <p className={SignInCSS.ResetPassword} onClick={() => { setResetPassword(!resetPassword) }}>
        {resetPassword ? "Sign in " : "Forgot you password?"}
      </p>
      <button onClick={clickHandler}>
        {resetPassword ? "Send email" : "Sign in"}
      </button>
      <SignInWithGoogle />
    </div>
  );
}
