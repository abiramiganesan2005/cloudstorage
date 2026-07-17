import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHAtUWnOv26T41WPKz-Hoze8HZbzB8V4g",
  authDomain: "cloud-file-storage-6797b.firebaseapp.com",
  projectId: "cloud-file-storage-6797b",
  storageBucket: "cloud-file-storage-6797b.firebasestorage.app",
  messagingSenderId: "11679482521",
  appId: "1:11679482521:web:c7f15582837fe48ba7ae08"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };