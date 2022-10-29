import React, { useState, useEffect } from "react";

import { login } from "../../firebase-config";

import SignInCSS from "./SignIn.module.scss";

export function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const clickHandler = async () => {

        let result = await login(email, password)

        if (result === true) {
            alert("Login Successful");
            window.open("/", "_self");
        }
        else {
            alert(result);
        }

    }

    return (
        <div className={SignInCSS.SignIn}>
            <h1>Sign In</h1>
            <input type="text" placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value) }}
                onKeyDown={
                    e => {
                        if (e.key === "Enter") { clickHandler() }
                    }} />
            <button onClick={clickHandler}>Sign In</button>
        </div>
    )

}


