import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCSikM5CnY3efQ1PyQFsueZgUHeWX6tsEI",
    authDomain: "linkedin-clone-c8494.firebaseapp.com",
    projectId: "linkedin-clone-c8494",
    storageBucket: "linkedin-clone-c8494.appspot.com",
    messagingSenderId: "966401590980",
    appId: "1:966401590980:web:88b6a4358fb9dd421feb91",
    measurementId: "G-EEL89E47N4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebaseApp.storage();

export { auth, provider, storage };
export default db;