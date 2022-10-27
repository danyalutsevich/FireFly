import React, {useState,useEffect} from "react";

import SignUpCSS  from "./SignUp.module.scss";

export function SignUp() {

    return(
        <div className={SignUpCSS.SignUp}>
            <h1>SignUp</h1>
            <input type="text" placeholder="Enter your email" />
            <input type="password" placeholder="Enter your password" />
            <button>Sign Up</button>
        </div>
    )

}


