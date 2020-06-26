import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCp4HzlcLxG-37BuW8a8qycPeazErRTOy8",
    authDomain: "auth-vue-6adff.firebaseapp.com",
    databaseURL: "https://auth-vue-6adff.firebaseio.com",
    projectId: "auth-vue-6adff",
    storageBucket: "auth-vue-6adff.appspot.com",
    messagingSenderId: "697465559044",
    appId: "1:697465559044:web:9175f4e6c8b1c68009bd51"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // base de datos de firebase
  const db = firebase.firestore()
   const auth = firebase.auth()

   export{db, auth}