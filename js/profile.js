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

const username=document.getElementById("username");
const email=document.getElementById("email");
const totalFiles=document.getElementById("totalFiles");

onAuthStateChanged(auth,async(user)=>{

if(!user){

window.location.href="login.html";
return;

}

username.innerHTML=user.displayName || "User";

email.innerHTML=user.email;

const q=query(
collection(db,"files"),
where("uid","==",user.uid)
);

const snapshot=await getDocs(q);

totalFiles.innerHTML=snapshot.size;

});

document.getElementById("dashboardBtn").onclick=()=>{

window.location.href="dashboard.html";

};

document.getElementById("logoutBtn").onclick=async()=>{

await signOut(auth);

alert("Logged Out Successfully");

window.location.href="login.html";

};