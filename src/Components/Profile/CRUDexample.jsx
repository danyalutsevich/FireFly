import React, { useState, useEffect } from "react";

import { app, db } from "../../firebase-config"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"

export function CRUDexample() {

    const [liked, setLiked] = useState([])
    const LikedCollectionRef = collection(db, "Liked")

    const [film_id, setFilm_id] = useState("")
    const [user_id, setUser_id] = useState("")
    const [like_date, setLike_date] = useState("")

    const getLiked = async () => {
        const likedData = await getDocs(LikedCollectionRef)
        console.log(likedData)
        setLiked(likedData.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }

    const addLiked = async () => {
        await addDoc(LikedCollectionRef, { film_id: film_id, user_id: user_id, like_date: { "seconds": Date.now(), nanoseconds: 0 } })
        getLiked()
    }

    const updateLiked = async (id, user_id) => {
        const likedDoc = doc(db, "Liked", id)
        await updateDoc(likedDoc, { user_id: Number(user_id) + 1 })
        getLiked()
    }



    const deleteLiked = async (id) => {
        await deleteDoc(doc(db, "Liked", id))
        getLiked()
    }

    useEffect(() => {
        getLiked()
    }, [])

    return (
        <div>
            <h2>CRUDexample</h2>

            <input placeholder='movie_id' onChange={(e) => { setFilm_id(e.target.value) }} />
            <input placeholder='user_id' onChange={(e) => { setUser_id(e.target.value) }} />
            <input placeholder='like_date' onChange={(e) => { setLike_date(e.target.value) }} />
            <button onClick={() => { addLiked() }}>add</button>
            {
                liked.map((item, index) => {
                    return (
                        <div key={index}>
                            <h3>film_id {item.film_id}</h3>
                            <h3>user_id {item.user_id}</h3>
                            <h3>like_date {item.like_date.seconds}</h3>
                            <h3>id {item.id}</h3>
                            <button onClick={() => { updateLiked(item.id, item.user_id) }}>update</button>
                            <button onClick={() => { deleteLiked(item.id) }}>delete</button>
                        </div>
                    )
                })}

            <h2>{JSON.stringify(liked)}</h2>
        </div>
    );


}