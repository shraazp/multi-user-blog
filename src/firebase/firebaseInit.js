import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDBtOQRmjNucP8IrhveeTJOMD1mbu4NzEk",
  authDomain: "vueblogs-73053.firebaseapp.com",
  projectId: "vueblogs-73053",
  storageBucket: "vueblogs-73053.appspot.com",
  messagingSenderId: "165420075202",
  appId: "1:165420075202:web:7aa6b247b96020774cd35b",
  measurementId: "G-3ZKNB2251S"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  
  export { timestamp };
  export default firebaseApp.firestore();