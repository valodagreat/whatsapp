import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAYjI3Xa9-g2B7yL-Hb2Mi4avglUGh5qUs",
    authDomain: "whatsapp-mern-dad7e.firebaseapp.com",
    databaseURL: "https://whatsapp-mern-dad7e.firebaseio.com",
    projectId: "whatsapp-mern-dad7e",
    storageBucket: "whatsapp-mern-dad7e.appspot.com",
    messagingSenderId: "47599962661",
    appId: "1:47599962661:web:14ead55b4d3367e9a1cdcc"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;