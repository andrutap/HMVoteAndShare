import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyChL4o9Up0pK1cyZllZpRiHM8-qJfDojDw",
    authDomain: "hmvoteandshare.firebaseapp.com",
    databaseURL: "https://hmvoteandshare.firebaseio.com",
    projectId: "hmvoteandshare",
    storageBucket: "hmvoteandshare.appspot.com",
    messagingSenderId: "1053173911220"
}

const firebaseApp = firebase.initializeApp(config)

export const db = firebaseApp.database()
