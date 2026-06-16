import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/* CREATE ACCOUNT */
window.createAccount = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    alert(e.message);
  }
};

/* LOGIN */
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    alert(e.message);
  }
};

/* LOGOUT */
window.logout = async function () {
  await signOut(auth);
};

/* AUTH STATE CONTROL */
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("authScreen").style.display = "none";
    document.getElementById("heroScreen").style.display = "block";
  } else {
    document.getElementById("authScreen").style.display = "block";
    document.getElementById("heroScreen").style.display = "none";
  }
});
