import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("welcomeText").innerHTML =
        "Welcome, " + user.email;

    // Get user's files
    const q = query(
        collection(db, "files"),
        where("uid", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    // Total Files
    document.getElementById("totalFiles").innerHTML = snapshot.size;

    // Storage Used
    let totalSize = 0;

    snapshot.forEach((doc) => {
        totalSize += doc.data().size;
    });

    document.getElementById("storageUsed").innerHTML =
        (totalSize / (1024 * 1024)).toFixed(2) + " MB";

    // Recent Uploads
    document.getElementById("recentUploads").innerHTML = snapshot.size;

    // Recent Files Table
    const tbody = document.getElementById("recentFilesTable");

    tbody.innerHTML = "";

    if (snapshot.empty) {

        tbody.innerHTML = `
            <tr>
                <td colspan="4">No Files Uploaded Yet</td>
            </tr>
        `;

    } else {

        snapshot.forEach((doc) => {

            const file = doc.data();

            let uploadDate = "-";

            if (file.uploadedAt) {
                uploadDate = file.uploadedAt.toDate().toLocaleDateString();
            }

            tbody.innerHTML += `
                <tr>
                    <td>${file.filename}</td>
                    <td>${file.type}</td>
                    <td>${(file.size / 1024).toFixed(2)} KB</td>
                    <td>${uploadDate}</td>
                </tr>
            `;

        });

    }

});

// Sidebar Buttons

document.getElementById("dashboardBtn").onclick = () => {
    window.location.href = "dashboard.html";
};

document.getElementById("uploadBtn").onclick = () => {
    window.location.href = "upload.html";
};

document.getElementById("uploadBottomBtn").onclick = () => {
    window.location.href = "upload.html";
};

document.getElementById("myFilesBtn").onclick = () => {
    window.location.href = "myfiles.html";
};

document.getElementById("profileBtn").onclick = () => {
    window.location.href = "profile.html";
};

document.getElementById("logoutBtn").onclick = async () => {

    await signOut(auth);

    alert("Logged Out Successfully");

    window.location.href = "login.html";

};