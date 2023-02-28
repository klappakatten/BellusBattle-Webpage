import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

//Write email to database on form submission
//Save message to database on form submission
//TODO:UPDATE SECURITY WITH BETTER AUTHENTICATION/SEPERATE SERVER REQUESTS

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUf4YNDwojGu2b4q4PvTdUysiVn3n8h6E",
  authDomain: "webbdev-4e1b3.firebaseapp.com",
  projectId: "webbdev",
  storageBucket: "webbdev.appspot.com",
  messagingSenderId: "46803967753",
  appId: "1:46803967753:web:83a179ca53227722aebdd8",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//Add email to firebase DB - RULES: CLIENTS CANT READ DB UNLESS AUTHENTICATED!
//TODO: Limit amount of possible inputs
async function addEmail(mailadress) {
  await setDoc(doc(db, "email", mailadress), {
    email: mailadress,
  });
}
//Add message and form input from media to firebase DB
async function submitForm(mailadress, name, message) {
  const time =
    new Date().toUTCString() +
    " id: " +
    new Date().getMilliseconds() * Math.random();
  await setDoc(doc(db, "form", time), {
    email: mailadress,
    id: time,
    message: message,
    name: name,
  });
}

$(document).ready(function () {
  $("#newsletter").on("submit", (e) => {
    e.preventDefault();
    addEmail($("#email").val());
    $("#email").val("Subscribed!");
  });

  $("#contactform").on("submit", (e) => {
    e.preventDefault();
    submitForm($("#email").val(), $("#name").val(), $("#textinput").val());
    e.target.reset();
  });
});
