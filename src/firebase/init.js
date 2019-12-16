import firebase from 'firebase'
import firestore from 'firebase/firestore' // this is the firestore version of firebase

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBAMmsKhQ3ZSIIF3SNoixX57f2-_QKUIYc",
  authDomain: "udemy-ninja-smoothies-aaf42.firebaseapp.com",
  databaseURL: "https://udemy-ninja-smoothies-aaf42.firebaseio.com",
  projectId: "udemy-ninja-smoothies-aaf42",
  storageBucket: "udemy-ninja-smoothies-aaf42.appspot.com",
  messagingSenderId: "233022445399",
  appId: "1:233022445399:web:7002fa969cd7ab33d25012",
  measurementId: "G-LZKN7SSQLC"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig); // for firestore purposes
//firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export firestore database to other modules, so we can import it into other modules.
export default firebaseApp.firestore()
