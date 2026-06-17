import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/* =========================
   LOGIN (MOBILE SAFE)
========================= */

window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "score.html";
  } catch (e) {
    console.log(e.code, e.message);
    alert(e.code);
  }
};

/* =========================
   CREATE ACCOUNT
========================= */

window.createAccount = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "score.html";
  } catch (e) {
    console.log(e.code, e.message);
    alert(e.code);
  }
};

/* =========================
   LOGOUT (for score.html)
========================= */

window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};
