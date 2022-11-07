import React, { useState, useEffect } from "react";
import { SignInWithGoogle } from "./SignInWithGoogle";
import { login, signInWithGoogle } from "../../firebase-config";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Alert } from "./Alert";
import SignInCSS from "./SignIn.module.scss";

export function SignIn() {
  const MySwal = withReactContent(Swal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickHandler = async () => {
    let result = await login(email, password);

    if (result === true) {
      Alert({
        title: "Success",
        icon: "success",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
        text: "You have successfully logged in!",
      });
      window.open("/", "_self");
    } else {
      console.log(result);
      Alert({
        title: result,
        icon: "error",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
        text: "Please, try again!",
      });
    }
  };

  return (
    <div className={SignInCSS.SignIn}>
      <h1>Sign In</h1>
      <input
        type="text"
        placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
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
      <button onClick={clickHandler}>Sign In</button>
      <SignInWithGoogle />
    </div>
  );
}
