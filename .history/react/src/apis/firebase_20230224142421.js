import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue, get, update } from "firebase/database";

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
    createUserData(user.uid, user.displayName, user.photoURL);
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
    if (user) {
      callback(user);
    } 
  });
}

export async function createUserData(userId, name, imageUrl){
  set(ref(db, 'users/' + userId), {
    username: name,
    profile_image: imageUrl
  });
}

export async function getUserName(userId){
  const userRef = ref(db, 'users/' + userId);
  onValue(userRef, (snapshot) => {
    return snapshot.val().username;
  })
}

export async function getUserImageUrl(userId){
  const userRef = ref(db, 'users/' + userId);
  onValue(userRef, (snapshot) => {
    return snapshot.val().profile_image;
  })
}

export function createMeetData(meet){
  const {meetId, host, departure, arrival, meetTime, recruitment, participant, transport, title, content } = meet;
  set(ref(db, 'meets/' + meetId), {
    meetId,
    host,
    departure,
    arrival,
    meetTime,
    recruitment, 
    participant,
    transport,
    title,
    content
  });
}

export async function getAllMeetData(){
  const meetRef = ref(db, 'meets/');
  return get(meetRef)
    .then((snapshot) => {
    if(snapshot.exists()){
      const result = Object.values(snapshot.val());
      return Promise.resolve(result);
    } else{
      console.warn('No AllMeetData Available');
      return Promise.resolve([]);
    }
  })
    .catch(console.error)
}

export async function getMeetDataById(meetId){
  const meetRef = ref(db, 'meets/' + meetId);
  return get(meetRef)
    .then((snapshot) => {
      if(snapshot.exists()){
        return Promise.resolve(snapshot.val());
      }
      else{
        console.warn('해당하는 모임 데이터가 없습니다.');
      }
    })
    .catch(console.error);
}

export async function addMeetParticipant(meetId, participant, newParticipant){
  const meetRef = ref(db, 'meets/' + meetId);
  update(meetRef, {
    participant: [...participant, newParticipant]
  });
}

export async function removeMeetParticipant(meetId, participant, targetParticipant){
  const meetRef = ref(db, 'meets/' + meetId);
  update(meetRef, {
    participant: participant.filter((user) => 
      user != targetParticipant
    )
  });
}

