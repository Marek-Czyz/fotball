import React from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { useState, useEffect, useContext, createContext } from 'react'
import { getDatabase } from 'firebase/database'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5SfeP0ZpQU-1mGJaYVTZXKMiDUmdcqeo",
  authDomain: "fotball-e61ab.firebaseapp.com",
  databaseURL: "https://fotball-e61ab-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fotball-e61ab",
  storageBucket: "fotball-e61ab.appspot.com",
  messagingSenderId: "958890924742",
  appId: "1:958890924742:web:91d36d8183e0db678a15c7",
  measurementId: "G-85W3T6R7S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);





const database = getDatabase(app);
 
export default database;

export const AuthContext = createContext()

//export const HandleLogout = handleLogout()

export const AuthContextProvider = props => {
  const [user, setUser] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
    return () => unsubscribe()
  }, [])
  return <AuthContext.Provider value={{ user, error }} {...props} />
}

export const useAuthState = () => {
  const auth = useContext(AuthContext)
  return { ...auth, isAuthenticated: auth.user != null }
}

