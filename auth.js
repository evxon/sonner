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
    alert("Account created");
  } catch (e) {
    console.error(e.code, e.message);
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
  } catch (e) {
    console.error(e.code, e.message);
    alert(e.code);
  }
};

/* LOGOUT */
window.logout = async function () {
  await signOut(auth);
};

/* SCREEN CONTROL */
function showApp(user) {
  document.getElementById("authScreen").style.display = "none";
  document.getElementById("heroScreen").style.display = "block";
}

function showAuth() {
  document.getElementById("authScreen").style.display = "block";
  document.getElementById("heroScreen").style.display = "none";
  hideAll();
}

/* AUTH STATE */
onAuthStateChanged(auth, (user) => {
  if (user) {
    showApp(user);
  } else {
    showAuth();
  }
});

/* helper (must exist because score screens exist elsewhere) */
function hideAll() {
  const ids = ["setupScreen","roundScreen","resultsScreen","archiveScreen"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}
