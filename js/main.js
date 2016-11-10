// Initialize Firebase
var config = {
    apiKey: "AIzaSyB-26mupGFJbe-szXjBAgpOKAdcVcr_yYo",
    authDomain: "syncdevice-7f6e2.firebaseapp.com",
    databaseURL: "https://syncdevice-7f6e2.firebaseio.com",
    storageBucket: "syncdevice-7f6e2.appspot.com",
    messagingSenderId: "938046412598"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();