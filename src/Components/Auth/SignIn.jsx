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

  useEffect(() => {
    document.title = "Sign In";
    document.querySelector('meta[name="description"]').setAttribute("content", `Here you can Sign In to your account with Google or with your email. Singin In gives you access to your Watchlist and to your Ratings also you can save films`)
    document.querySelector('meta[property="og:description"]').setAttribute("content", `Here you can Sign In to your account with Google or with your email Singin In gives you access to your Watchlist and to your Ratings also you can save films`)
    document.querySelector('meta[property="og:title"]').setAttribute("content", "Sign In")
  },[])

  const clickHandler = async () => {
    resetPassword ? await resetPasword(email) : await login(email, password);
    setResetPassword(false);
  };

  function ShowPassword() {
    const passField = document.querySelector("input");
    const showBtn = document.querySelector("span i");
    showBtn.onclick = (()=>{
      if(passField.type === "password") {
        passField.type = "text";
        showBtn.classList.add("conceal-btn");
      }
      else {
        passField.type = "password";
       showBtn.classList.remove("conceal-btn");
      } 
    });
  }
 function Password() {
    return(
      <div>
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
      </div>
      
  
    );
  }

  return (
    <div className={SignInCSS.SignIn}>
      <h1>{resetPassword ? "Reset password" : "Sign In"}</h1>
      <input type="text" placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {resetPassword || Password()
      }
      <p className={SignInCSS.ResetPassword} onClick={() => { setResetPassword(!resetPassword) }}>
        {resetPassword ? "Sign in " : "Forgot your password?"}
      </p>
      <button onClick={clickHandler}>
        {resetPassword ? "Send email" : "Sign in"}
      </button>
      <SignInWithGoogle />
    </div>
  );
}
