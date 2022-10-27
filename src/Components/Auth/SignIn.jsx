import React, {useState,useEffect} from "react";

import SignInCSS  from "./SignIn.module.scss";

export function SignIn() {

    return(
        <div className={SignInCSS.SignIn}>
            <h2>Sign In</h2>
            <input type="text" placeholder="Enter your email" />
            <input type="password" placeholder="Enter your password" />
            <button>Sign In</button>
        </div>
    )

}


