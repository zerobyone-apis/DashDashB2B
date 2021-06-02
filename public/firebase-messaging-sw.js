importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js');

//* here we need to put the same info from .ENV due to dont recognize the Instance centralization file.
//todo: 
const firebaseConfig = {
  apiKey: 'AIzaSyAxehSdjrnCXGLApgiCUW7Geoh7L7opQ84',
  authDomain: 'wt-test-11301.firebaseapp.com',
  databaseURL: 'https://wt-test-11301.firebaseio.com',
  projectId: 'wt-test-11301',
  storageBucket: 'wt-test-11301.appspot.com',
  messagingSenderId: '337469102940',
  appId: '1:337469102940:web:902a1ddee2e251fae67f99',
  measurementId: 'G-VEPSEJNT2H',
};

const fire = firebase.initializeApp(firebaseConfig);
const messaging = fire.messaging();


//! This method just send a message if the user is not in the application window.
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messagin-sw.js] Received background message ',
    payload
  );
  const title = payload.data.title;
  const data = {
    body: payload.data.body,
    icon: payload.data.icon,
  };
  return self.registration.showNotification(title, data);
});

function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(
      process.env.PUBLIC_URL + '/firebase-messagin-sw.js'
    );
  }
}


//! Postman request and body object to test this funciton on background message.
//? POST METHOD -> https://fcm.googleapis.com/fcm/send
//? Headers: Content-Type application/json - 
//?          Authorization key=AAAATpK521w:APA91bE3As4EMnHdxdUYBAKZXstqkXIs2H9x4ZtVrwc5loWUUp_fUK-GodZF4yr8g-EA7wr9l9c5M0eAJ9bLREVW0x-orpBV4Zn_0ncaE80nF94ROnYQ7Sp8NzeTNKAjhb2YOfPCJ4Rb
//* {
//*   "to": "dpd56v7tA_JiS_e_4ep_mU:APA91bHl-wuhrEJAgmtbmDYogZwRDLa3Wln_4_ZTBo8xHgYcL06k4jtKKtvNHYJ0inGXfLEhn6Ucv38G-sWcPbHXlvF4mqPnbC-N7i-ffJkJiag5yogmXYatrc1Ot9FHDzPtizsHDS7J",
//*   "data": {
//*     "title": "Hey, Demo it's Work!",
//*     "body": "Body message on notification 🚀",
//*     "icon": "https://www.pinclipart.com/picdir/big/548-5485193_iphone-7-push-technology-apple-push-notification-push.png"
//* }
//* }


