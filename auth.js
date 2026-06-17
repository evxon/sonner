import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/* =========================
   FORCE LOGOUT ON EVERY LOAD
   (THIS IS THE KEY FIX)
========================= */
signOut(auth);

/* CREATE ACCOUNT */
window.createAccount = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created");
    loginSuccess();
  } catch (e) {
    alert(e.code);
  }
};

/* LOGIN */
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in");
    loginSuccess();
  } catch (e) {
    alert(e.code);
  }
};

/* LOGOUT */
window.logout = async function () {
  await signOut(auth);
};
