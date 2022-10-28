import React, { useState, useEffect } from "react";

import { register, uploadImage } from "../../firebase-config";

import SignUpCSS from "./SignUp.module.scss";

export function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);

    const clickHandler = async () => {

        let result = await register(email, password, name)
        await uploadImage(image)
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
            <div>
                <h3>Profile picture</h3>
                <input type="file" onChange={e => { setImage(e.target.files[0]); console.log(e.target.files) }} />
            </div>
            <input type="password" placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value) }}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        clickHandler()
                    }
                }} />
            <button onClick={clickHandler}>Sign Up</button>
        </div>
    )

}


