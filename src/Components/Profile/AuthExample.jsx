import React, { useState, useEffect } from "react";
import { app, db, auth } from "../../firebase-config"

import { createUserWithEmailAndPassword,updateProfile,onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

export function AuthExample() {

    const [Eregister, setEregister] = useState("")
    const [Pregister, setPregister] = useState("")

    const [Elogin, setElogin] = useState("")
    const [Plogin, setPlogin] = useState("")

    const [user, setUser] = useState({})


    useEffect(() => {
        console.log(auth.currentUser)
        onAuthStateChanged(auth, (user) => { setUser(user) })
    }, [])

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, Eregister, Pregister)
            console.log(user)
            console.log(auth.currentUser)
        } catch (error) {
            console.log(error)
        }

    }

    const login = async () => {
        try{
            signInWithEmailAndPassword(auth, Elogin, Plogin)
        }catch(error){
            console.log(error)
        }
    }
    
    const logout = async () => {
        signOut(auth)
    }

    return (
        <div>
            <h2>Auth</h2>
            <div>
                <input placeholder="email" onChange={(e) => { setEregister(e.target.value) }}></input>
                <input placeholder="password" onChange={(e) => { setPregister(e.target.value) }}></input>
                <button onClick={register}>Register</button>
            </div>
            <div>
                <input placeholder="email" onChange={(e) => { setElogin(e.target.value) }}></input>
                <input placeholder="password" onChange={(e) => { setPlogin(e.target.value) }}></input>
                <button onClick={login}>Log In</button>
            </div>
            <div>
                <h2>User Logged In:</h2>
                <h3>{user?.email}</h3>
                <button onClick={logout}>Log Out</button>
            </div>
        </div>
    )

}
