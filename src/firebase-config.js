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

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      onSnapshot(doc(db, "Liked", currentUser?.uid), (snapshot) => {
        setLikedFilms(snapshot.data()?.likedFilms);
      });
      onSnapshot(doc(db, "Watchlist", currentUser?.uid), (snapshot) => {
        setWatchlistFilms(snapshot.data()?.watchlistFilms);
      });
    })
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, liked, watchlist }}> {/* <-- this is the value that will be shared with all components*/}
      {children}
    </FirebaseContext.Provider>
  );
}

export const register = async (email, password, name) => {
  if (email && password && name) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      return true;
    } catch (error) {
      Alert({ title: error.code });
    }
  } else {
    Alert("Empty fields");
    return false;
  }
};

export const login = async (email, password) => {
  if (email && password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.open("/", "_self");
      return true;
    } catch (error) {
      return error.code;
    }
  } else {
    Alert("Empty fields");
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
    await deleteUser(auth.currentUser);
    window.open("/", "_self");
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
    window.open("/", "_self");
  } catch (error) {
    Alert({ title: error.code });
  }
};

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
      Alert("Please select a file");
    }
  } else {
    Alert("Please login to upload a profile picture");
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
    Alert("Please login to remove your profile picture");
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

export const like = async (filmID) => {
  if (auth.currentUser?.uid) {
    try {
      const documentRef = doc(db, "Liked", auth.currentUser.uid);
      const document = await getDoc(documentRef)
      const likedFilms = document.data()?.likedFilms

      if (likedFilms) {
        if (likedFilms.includes(filmID)) {
          likedFilms.splice(likedFilms.indexOf(filmID), 1)
          await setDoc(documentRef, { likedFilms: [...likedFilms] }, { merge: true });
        }
        else {
          await setDoc(documentRef, { likedFilms: [...likedFilms, filmID] }, { merge: true });
        }
      }
      else {
        await setDoc(documentRef, { likedFilms: [filmID] }, { merge: true });
      }
    }
    catch (error) {
      Alert({ title: error.code });
    }
  }
  else {
    Alert("Please login to like films");
  }
}

export const watchlistOperation = async (filmID) => {
  if (auth.currentUser?.uid) {
    try {
      const documentRef = doc(db, "Watchlist", auth.currentUser.uid);
      const document = await getDoc(documentRef)
      const watchlistFilms = document.data()?.watchlistFilms

      if (watchlistFilms) {
        if (watchlistFilms.includes(filmID)) {
          watchlistFilms.splice(watchlistFilms.indexOf(filmID), 1)
          await setDoc(documentRef, { watchlistFilms: [...watchlistFilms] }, { merge: true });
        }
        else {
          await setDoc(documentRef, { watchlistFilms: [...watchlistFilms, filmID] }, { merge: true });
        }
      }
      else {
        await setDoc(documentRef, { watchlistFilms: [filmID] }, { merge: true });
      }
    }
    catch (error) {
      Alert({ title: error.code })
    }
  }
  else {
    Alert("Please login to add a film to your watchlist")
  }
}


