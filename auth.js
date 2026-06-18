import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/* =========================
   PAGE TRANSITION
========================= */

function goToPage(url) {
  const transition = document.getElementById("pageTransition");
  transition.classList.add("active");

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
    goToPage("score.html");
  } catch (e) {
    handleAuthError(e);
  }
};

/* =========================
   GOOGLE LOGIN (FIXED)
========================= */

window.googleLogin = async function () {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    console.log("Google user:", result.user.email);

    goToPage("score.html");
  } catch (e) {
    console.log(e.code, e.message);
    alert("Google login failed: " + e.message);
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
   AUTO LOGIN (IMPORTANT FIX)
========================= */

onAuthStateChanged(auth, (user) => {
  if (user) {
    // already logged in → skip login page
    if (window.location.pathname.includes("login")) {
      window.location.href = "score.html";
    }
  }
});

/* =========================
   ERROR HANDLING
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
