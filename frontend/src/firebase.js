// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC9axacpLu2YnER2U1JsX0INoP8-CPtifQ",
    authDomain: "whatsapp-mern-fb917.firebaseapp.com",
    projectId: "whatsapp-mern-fb917",
    storageBucket: "whatsapp-mern-fb917.appspot.com",
    messagingSenderId: "508929995481",
    appId: "1:508929995481:web:540280a5cde937490404c8"
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;