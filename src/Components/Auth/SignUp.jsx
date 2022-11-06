import React, { useState, useEffect } from "react";

import { register, uploadImage } from "../../firebase-config";

import { SignInWithGoogle } from "./SignInWithGoogle";

import SignUpCSS from "./SignUp.module.scss";

export function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const clickHandler = async () => {
        let result = await register(email, password, name)

        if (result === true) {
            alert("Registration Successful");
            window.open("/", "_self");
        }

    }

    return (
        <div className={SignUpCSS.SignUp}>
            <h1>SignUp</h1>
            <input type="text" placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="text" placeholder="Enter your name" onChange={(e) => { setName(e.target.value) }} />
            <input type="password" placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value) }}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        clickHandler()
                    }
                }} />
            <button onClick={clickHandler}>Sign Up</button>
            <SignInWithGoogle />
        </div>
    )

}


