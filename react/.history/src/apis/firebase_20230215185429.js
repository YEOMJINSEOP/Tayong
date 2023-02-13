import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function login(){
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    return user
  })
  .then((user) => {
    writeUserData(user.uid, user.displayName, user.photoURL);
    return user
  })
  .then((user) => {
    getUserData(user.uid);
    return user
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}

export async function logout(){
  signOut(auth).then((result) => {
    return null
  }).catch((error) => {
    // An error happened.
  });
}

export function onUserStateChange(callback){
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function writeUserData(userId, name, imageUrl){
  set(ref(db, 'users/' + userId), {
    username: name,
    profile_picture: imageUrl
  });
}

export async function getUserData(userId){
  const userRef = ref(db, 'users/' + userId);
  onValue(userRef, (snapshot) => {
    return snapshot.val();
  })
}