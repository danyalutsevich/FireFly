import { createContext, useState, useEffect, useContext } from "react";

import { initializeApp } from "firebase/app";
import { addDoc, getFirestore, onSnapshot, setDoc, doc, getDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
  sendPasswordResetEmail,
} from "firebase/auth";

import { Alert } from "./Components/Alert";

const firebaseConfig = {
  apiKey: "AIzaSyAW1QeSbF0Y0_ryBOIm9sZVH-aTNl47Fgs",
  authDomain: "firefly-49286.firebaseapp.com",
  projectId: "firefly-49286",
  storageBucket: "firefly-49286.appspot.com",
  messagingSenderId: "537208436176",
  appId: "1:537208436176:web:afc9faa18b2c6dd1adb5d5",
  measurementId: "G-JKQFZDWW4P",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();

// import this context in your component and use useContex(FirebaseContext) hook to get the value
export const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {

  // this is the state that will be shared with all components
  // so you dont need to create a new state for each component 
  // and make additional requests to the database

  const [user, setUser] = useState(null);
  const [liked, setLikedFilms] = useState([]);
  const [watchlist, setWatchlistFilms] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      onSnapshot(doc(db, "Liked", currentUser?.uid), (snapshot) => {
        setLikedFilms(snapshot.data()?.likedFilms || []);
      });
      onSnapshot(doc(db, "Watchlist", currentUser?.uid), (snapshot) => {
        setWatchlistFilms(snapshot.data()?.watchlistFilms || []);
      });
      onSnapshot(doc(db, "Rating", currentUser?.uid), (snapshot) => {
        setRatings(snapshot.data()?.ratings || {});
      });
    })
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, liked, watchlist, ratings }}> {/* <-- this is the value that will be shared with all components*/}
      {children}
    </FirebaseContext.Provider>
  );
}

export const register = async (email, password, name) => {
  if (email && password && name) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      await Alert({ title: "Registration successful!", icon: "success", text: "" });
      window.open("/", "_self");
    } catch (error) {
      Alert({ title: error.code });
    }
  } else {
    Alert({ title: "Empty fields" });
  }
};

export const login = async (email, password) => {
  if (email && password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await Alert({ title: "Login successful!", icon: "success", text: "" });
      window.open("/", "_self");
    } catch (error) {
      Alert({ title: error.code });
    }
  } else {
    Alert({ title: "Empty fields" });
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    window.open("/", "_self");
  } catch (error) {
    Alert({ title: error.code });
  }
}

export const deleteUserAccount = async () => {
  try {
    Alert({ title: "You are going to delete your account.\n\nAre you sure?", text: "This action cannot be undone", icon: "question", timer: false, showConfirmButton: true, showCancelButton: true })
      .then(async (result) => {
        if (result.isConfirmed) {
          await deleteUser(auth.currentUser);
          await Alert({ title: "Your account succesfully deleted", icon: "success", text: "" });
          window.open("/", "_self");
        }
      }).catch((error) => {
        Alert({ title: error.code });
      });

  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      Alert("You need to reauthenticate before deleting your account");
      window.open("/signin", "_self");
    } else {
      Alert({ title: error.code });
    }
  }
};

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
    await Alert({ title: "Login successful!", icon: "success", text: "" });
    window.open("/", "_self");
  } catch (error) {
    Alert({ title: error.code });
  }
};

export const updateName = async (name) => {
  if (name) {
    try {
      await updateProfile(auth.currentUser, { displayName: name });
      window.location.reload();
    } catch (error) {
      Alert({ title: error.code });
    }
  }
}

export const uploadImage = async (file) => {
  if (auth.currentUser.uid) {
    if (file) {
      try {
        const storageRef = ref(
          storage,
          "profilePictures/" + auth.currentUser.uid
        );
        await uploadBytes(storageRef, file);
        await updateProfile(auth.currentUser, {
          photoURL: await getDownloadURL(storageRef),
        });
        window.location.reload();
      } catch (error) {
        Alert({ title: error.code });
      }
    } else {
      Alert({ title: "Please select a file" });
    }
  } else {
    Alert({ title: "Please login to upload a profile picture" });
  }
};

export const removeImage = async () => {
  if (auth.currentUser.uid) {
    try {
      await updateProfile(auth.currentUser, { photoURL: "" });
      window.location.reload();
    } catch (error) {
      Alert({ title: error.code });
    }
  } else {
    Alert({ title: "Please login to remove your profile picture" });
  }
};

export const like = async (filmID) => {
  const id = Number(filmID)
  if (auth.currentUser?.uid && id) {
    try {
      const documentRef = doc(db, "Liked", auth.currentUser.uid);
      const document = await getDoc(documentRef)
      const likedFilms = document.data()?.likedFilms

      if (likedFilms) {
        if (likedFilms.includes(id)) {
          likedFilms.splice(likedFilms?.indexOf(id), 1)
          await setDoc(documentRef, { likedFilms: [...likedFilms] }, { merge: true });
        }
        else {
          await setDoc(documentRef, { likedFilms: [...likedFilms, id] }, { merge: true });
        }
      }
      else {
        await setDoc(documentRef, { likedFilms: [id] }, { merge: true });
      }
    }
    catch (error) {
      Alert({ title: error.code });
    }
  }
  else {
    Alert({ title: "Please login to like films" });
  }
}

export const saveToWatchlist = async (filmID) => {
  const id = Number(filmID)
  if (auth.currentUser?.uid && id) {
    try {
      const documentRef = doc(db, "Watchlist", auth.currentUser.uid);
      const document = await getDoc(documentRef)
      const watchlistFilms = document.data()?.watchlistFilms

      if (watchlistFilms) {
        if (watchlistFilms.includes(id)) {
          watchlistFilms.splice(watchlistFilms?.indexOf(id), 1)
          await setDoc(documentRef, { watchlistFilms: [...watchlistFilms] }, { merge: true });
        }
        else {
          await setDoc(documentRef, { watchlistFilms: [...watchlistFilms, id] }, { merge: true });
        }
      }
      else {
        await setDoc(documentRef, { watchlistFilms: [id] }, { merge: true });
      }
    }
    catch (error) {
      Alert({ title: error.code })
    }
  }
  else {
    Alert({ title: "Please login to add a film to your watchlist" })
  }
}

export const addRating = async (filmID, rating) => {
  if (filmID && rating && auth.currentUser?.uid) {
    try {
      const documentRef = doc(db, "Rating", auth.currentUser.uid);
      const document = await getDoc(documentRef)
      const ratings = document.data()?.ratings

      if (ratings) {
        if (ratings[filmID]) {
          ratings[filmID] = rating
          await setDoc(documentRef, { ratings: { ...ratings } }, { merge: true });
        }
        else {
          await setDoc(documentRef, { ratings: { ...ratings, [filmID]: rating } }, { merge: true });
        }
      }
      else {
        await setDoc(documentRef, { ratings: { [filmID]: rating } }, { merge: true });
      }
    }
    catch (error) {
      Alert({ title: error.code })
    }
  }

}

export const resetPasword = async (email) => {

  try {
    await sendPasswordResetEmail(auth, email)
    Alert({ title: "Email was sent\nFollow the link in the email\nCheck your inbox or spam", text: "", icon: "success", showConfirmButton: true, timer: false })
  }
  catch (error) {
    Alert({ title: error.code })
  }

}
