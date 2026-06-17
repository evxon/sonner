import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/* =========================
   LOGIN
========================= */

window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "score.html";
  } catch (e) {
    console.log(e.code, e.message);

    handleAuthError(e);
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

    handleAuthError(e);
  }
};

/* =========================
   LOGOUT
========================= */

window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};

/* =========================
   CLEAN ERROR MESSAGES
========================= */

function handleAuthError(e) {
  let message = "Something went wrong";

  switch (e.code) {

    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      message = "Wrong email or password";
      break;

    case "auth/invalid-email":
      message = "Invalid email address";
      break;

    case "auth/weak-password":
      message = "Password should be at least 6 characters";
      break;

    case "auth/email-already-in-use":
      message = "Account already exists";
      break;

    case "auth/too-many-requests":
      message = "Too many attempts. Try again later";
      break;
  }

  alert(message);
}
