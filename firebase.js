import { auth, db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/* SAVE ROUND */
window.saveToFirebase = async function (result) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, "rounds"), {
    uid: user.uid,
    date: new Date().toISOString(),
    scores: result
  });

  loadArchive();
};

/* LOAD ARCHIVE */
window.loadArchive = async function () {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(collection(db, "rounds"), where("uid", "==", user.uid));
  const snap = await getDocs(q);

  let html = "";

  snap.forEach((d) => {
    const data = d.data();

    html += `
      <div style="padding:16px;border-bottom:1px solid #eee">
        <div style="font-size:12px;color:#777;margin-bottom:8px">
          ${new Date(data.date).toLocaleString()}
        </div>

        ${data.scores
          .map(
            (p) => `
              <div>${p.name} — ${p.score}</div>
            `
          )
          .join("")}

        <button onclick="deleteRound('${d.id}')">Delete</button>
      </div>
    `;
  });

  document.getElementById("archiveList").innerHTML = html;
};

/* DELETE ROUND */
window.deleteRound = async function (id) {
  await deleteDoc(doc(db, "rounds", id));
  loadArchive();
};

/* AUTO LOAD WHEN LOGGED IN */
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadArchive();
  }
});
