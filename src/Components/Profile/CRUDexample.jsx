import React, { useState, useEffect } from "react";

import { app, db, auth } from "../../firebase-config"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, setDoc, doc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";

export function CRUDexample() {

    const [liked, setLiked] = useState([])
    const LikedCollectionRef = collection(db, "Liked")
    // const LikedCollectionRef = db.collection("Liked")
    const [film_id, setFilm_id] = useState("")
    const [user_id, setUser_id] = useState("")
    const [like_date, setLike_date] = useState("")

    const [user, setUser] = useState({})
    useEffect(() => {
        onAuthStateChanged(auth, (user) => { setUser(user) })
    }, [])


    const getLiked = async () => {
        const likedData = await getDocs(LikedCollectionRef)
        setLiked(likedData.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }

    const addLiked = async () => {
        await addDoc(LikedCollectionRef, { film_id: film_id, user_id: user_id, like_date: { "seconds": Date.now(), nanoseconds: 0 } })
        getLiked()
    }

    const updateLiked = async (id, user_id) => {
        const likedDoc = doc(db, "Liked", id)
        await updateDoc(likedDoc, { user_id: [...user_id, Number(user_id[user_id.length - 1]) + 1] })
        getLiked()
    }

    const deleteLiked = async (id) => {
        await deleteDoc(doc(db, "Liked", id))
        getLiked()
    }

    const addLikedWithDB = async () => {

        await setDoc(doc(db, "Liked", user?.uid), { liked_IDs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] })
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
            <button onClick={() => { addLikedWithDB() }}>add with db</button>
            {
                liked.map((item, index) => {
                    return (
                        <div key={index}>
                            <h3>film_id {item?.film_id}</h3>
                            <h3>liked_IDs {JSON.stringify(item?.liked_IDs)}</h3>
                            <h3>user_id {JSON.stringify(item.user_id)}</h3>
                            <h3>like_date {item.like_date?.seconds}</h3>
                            <h3>id {item?.id}</h3>
                            <button onClick={() => { updateLiked(item.id, item.user_id) }}>update</button>
                            <button onClick={() => { deleteLiked(item.id) }}>delete</button>
                        </div>
                    )
                })}

            <h2>{JSON.stringify(liked)}</h2>
        </div>
    );


}