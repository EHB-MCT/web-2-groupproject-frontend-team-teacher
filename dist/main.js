(()=>{"use strict";let e="";window.onload=function(){async function n(){e="";let n=await fetch("https://web2-groupbackend-teamteacher.herokuapp.com/challenges");(await n.json()).forEach((n=>{e+=`<div class="row challenge" id="${n._id}">   \n            <div class="col-10">\n                <p>${n.course} - ${n.name} <span class="exp">(${n.points} Exp.)</span></p>\n            </div>\n            <div class="col-1 edit">\n                <i class="fas fa-edit"></i>\n            </div>                         \n            <div class="col-1 delete">\n                <i class="fas fa-trash"></i>\n            </div>\n        </div>`})),document.getElementById("challengeList").innerHTML=e}document.getElementById("uploadForm").addEventListener("submit",(e=>{e.preventDefault(),async function(e){let t=document.getElementById("name").value,s=document.getElementById("points").value,a=document.getElementById("course").value,c=document.getElementById("session").value;fetch("https://web2-groupbackend-teamteacher.herokuapp.com/challenges",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,points:s,course:a,session:c})}).then((e=>e.json())).then((async e=>{console.log("Success:",e),await n()}))}()})),n()}})();