import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/* OPTIONAL: FORCE LOGOUT ON LOGIN PAGE */
signOut(auth);

/* CREATE ACCOUNT */
window.createAccount = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "score.html";
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
    window.location.href = "score.html";
  } catch (e) {
    alert(e.code);
  }
};

/* LOGOUT (optional use inside score.html) */
window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};
