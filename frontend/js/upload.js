import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const progressBar = document.getElementById("progressBar");
const status = document.getElementById("status");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    currentUser = user;
});

uploadBtn.addEventListener("click", async () => {

    const file = fileInput.files[0];

    if (!file) {
        alert("Please choose a file.");
        return;
    }

    progressBar.value = 10;
    status.innerHTML = "Uploading...";

    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", "cloudstorage_upload");

    try {

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/lwcgqv5q/auto/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

console.log("Cloudinary Response:", data);

if (!response.ok) {
    alert("Cloudinary Error: " + JSON.stringify(data));
    return;
}

        progressBar.value = 70;

        await addDoc(collection(db, "files"), {

            uid: currentUser.uid,

            filename: file.name,

            type: file.type,

            size: file.size,

            downloadURL: data.secure_url,

            publicId: data.public_id,

            uploadedAt: serverTimestamp()

        });

        progressBar.value = 100;

        status.innerHTML = "✅ File Uploaded Successfully";

        alert("File Uploaded Successfully");

        fileInput.value = "";

    } catch (error) {

    console.error("Upload Error:", error);

    alert(error.message);

    status.innerHTML = "❌ Upload Failed";

}

});