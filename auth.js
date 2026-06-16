import { app } from './firebase-config.js';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const auth = getAuth(app);

/* CREATE ACCOUNT */
window.createAccount = async function () {

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error.message);
  }
};

/* LOGIN */
window.login = async function () {

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error.message);
  }
};

/* LOGOUT (optional) */
window.logout = async function () {
  await signOut(auth);
};

/* AUTH FLOW */
onAuthStateChanged(auth, (user) => {

  const authScreen = document.getElementById('authScreen');
  const hero = document.getElementById('heroScreen');
  const setup = document.getElementById('setupScreen');
  const round = document.getElementById('roundScreen');
  const results = document.getElementById('resultsScreen');

  if (user) {

    authScreen.style.display = 'none';
    hero.style.display = 'block';

    setup.style.display = 'none';
    round.style.display = 'none';
    results.style.display = 'none';

  } else {

    authScreen.style.display = 'block';

    hero.style.display = 'none';
    setup.style.display = 'none';
    round.style.display = 'none';
    results.style.display = 'none';

  }
});
