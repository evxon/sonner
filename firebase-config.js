import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBH-ZtTpTJLOquj_nrP6GrpRFiRRQXQrZ0",
  authDomain: "sonner-scoreboard.firebaseapp.com",
  projectId: "sonner-scoreboard",
  storageBucket: "sonner-scoreboard.firebasestorage.app",
  messagingSenderId: "497804336981",
  appId: "1:497804336981:web:e970716a65e8a5bd8ad9dc",
  measurementId: "G-D6YDDMQ2Q2"
};

export const app = initializeApp(firebaseConfig);
