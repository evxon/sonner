import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBH-ZtTpTJLOquj_nrP6GrpRFiRRQXQrZ0",
  authDomain: "sonner-scoreboard.firebaseapp.com",
  projectId: "sonner-scoreboard",
  storageBucket: "sonner-scoreboard.firebasestorage.app",
  messagingSenderId: "497804336981",
  appId: "1:497804336981:web:e970716a65e8a5bd8ad9dc",
  measurementId: "G-D6YDDMQ2Q2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
