import firebase from 'firebase';
import 'firebase/messaging';
import 'firebase/auth';
import 'dotenv/config';

//? Firebase Credentials, here we need to call .ENV file and set with secure before to push up.
const firebaseConfig = {
  apiKey: 'AIzaSyAxehSdjrnCXGLApgiCUW7Geoh7L7opQ84', // change this for your data
  authDomain: 'wt-test-11301.firebaseapp.com', // change this for your data
  databaseURL: 'https://wt-test-11301.firebaseio.com', // change this for your data
  projectId: 'wt-test-11301', // change this for your data
  storageBucket: 'wt-test-11301.appspot.com', // change this for your data
  messagingSenderId: '337469102940', // change this for your data
  appId: '1:337469102940:web:902a1ddee2e251fae67f99', // change this for your data
  measurementId: 'G-VEPSEJNT2H', // change this for your data
};


export const fire = firebase.initializeApp(firebaseConfig);
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
export const messaging = fire.messaging();
export const db = firebase.firestore();
export const provider = new firebase.auth.OAuthProvider('microsoft.com');


