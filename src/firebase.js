import firebase from 'firebase';

// Paste your firebase details below:
const firebaseConfig = {
    apiKey: "-------",
    authDomain: "---------------",
    projectId: "-------------",
    storageBucket: "-------",
    messagingSenderId: "------------",
    appId: "-------------",
    measurementId: "-------------"
  };


  // No need to change anything below this line
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebaseApp.storage();

export { auth, provider, storage };
export default db;