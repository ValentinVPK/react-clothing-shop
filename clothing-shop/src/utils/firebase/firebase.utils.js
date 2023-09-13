import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWJ6aH2tuaaqABFPiXF3wzuyO60Z7fKBk",
  authDomain: "react-clothing-db-d51dc.firebaseapp.com",
  projectId: "react-clothing-db-d51dc",
  storageBucket: "react-clothing-db-d51dc.appspot.com",
  messagingSenderId: "708645045657",
  appId: "1:708645045657:web:e1c8c147f85c8241007f08",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(); // singleton
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore(); //singleton

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAd = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAd
            })
        } catch (error) {
            console.log('error creating the user ', error.message);
        }
    }

    return userDocRef;
}