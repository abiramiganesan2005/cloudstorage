import { auth, db } from "./firebase.js";

import {
collection,
query,
where,
getDocs,
deleteDoc,
doc

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {

onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const table=document.getElementById("fileTable");

const search=document.getElementById("searchInput");

let files=[];

onAuthStateChanged(auth,async(user)=>{

if(!user){

window.location.href="login.html";

return;

}

const q=query(

collection(db,"files"),

where("uid","==",user.uid)

);

const snapshot=await getDocs(q);

files=[];

table.innerHTML="";

snapshot.forEach((docSnap)=>{

const data=docSnap.data();

files.push({

id:docSnap.id,

...data

});

});

displayFiles(files);

});

function displayFiles(fileList){

table.innerHTML="";

fileList.forEach(file=>{

table.innerHTML+=`

<tr>

<td>${file.filename}</td>

<td>${file.type}</td>

<td>${(file.size/1024).toFixed(2)} KB</td>

<td>${new Date(file.uploadedAt.seconds*1000).toLocaleDateString()}</td>

<td>

<button class="preview"
onclick="window.open('${file.downloadURL}')">

Preview

</button>

<button class="download"
onclick="window.location='${file.downloadURL}'">

Download

</button>

<button class="delete"
onclick="deleteFile('${file.id}')">

Delete

</button>

</td>

</tr>

`;

});

}

window.deleteFile=async(id)=>{

await deleteDoc(doc(db,"files",id));

location.reload();

};

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

const filtered=files.filter(file=>

file.filename.toLowerCase().includes(value)

||

file.type.toLowerCase().includes(value)

);

displayFiles(filtered);

});