console.log("auth.js loaded");
import { auth } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/* =========================
   PAGE TRANSITION
========================= */

function goToPage(url) {
  const transition = document.getElementById("pageTransition");

  if (transition) {
    transition.classList.add("active");
  }

  setTimeout(() => {
    window.location.href = url;
  }, 500);
}

/* =========================
   EMAIL LOGIN
========================= */

window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    goToPage("score.html");
  } catch (e) {
    alert(e.message);
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
    goToPage("score.html");
  } catch (e) {
    alert(e.message);
  }
};

/* =========================
   GOOGLE LOGIN (FIXED)
========================= */

window.googleLogin = async function () {
  console.log("Google button clicked");

  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);
};

/* =========================
   HANDLE REDIRECT RESULT
========================= */

window.addEventListener("load", async () => {
  try {
    const result = await getRedirectResult(auth);

    if (result && result.user) {
      console.log("Google login success:", result.user.email);
      goToPage("score.html");
    }
  } catch (error) {
    console.log(error.code, error.message);
  }
});

/* =========================
   LOGOUT
========================= */

window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};

/* =========================
   AUTO LOGIN CHECK
========================= */

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (window.location.pathname.includes("login")) {
      window.location.href = "score.html";
    }
  }
});
