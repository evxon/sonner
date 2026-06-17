import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/* =========================
   LOGIN ONLY BY USER ACTION
========================= */

window.createAccount = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    loginSuccess(); // go in immediately
  } catch (e) {
    alert(e.code);
  }
};

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginSuccess(); // ONLY manual entry
  } catch (e) {
    alert(e.code);
  }
};

/* logout still works */
window.logout = async function () {
  await signOut(auth);
};
