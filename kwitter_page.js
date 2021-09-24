
  // Import the functions you need from the SDKs you need
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
      apiKey: "AIzaSyDu8cN2cDkby6Fk7RJM9Ca2A3aAzP-APK4",
      authDomain: "kwitter-f90ea.firebaseapp.com",
      databaseURL: "https://kwitter-f90ea-default-rtdb.firebaseio.com",
      projectId: "kwitter-f90ea",
      storageBucket: "kwitter-f90ea.appspot.com",
      messagingSenderId: "289856761120",
      appId: "1:289856761120:web:3f62d577a0316429ecfb45"
    };
  
    // Init]=ialize Firebase
  firebase.initializeApp(firebaseConfig);

user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");

function send() {
      msg=document.getElementById("msg").value; 
      firebase.database().ref(room_name).push({
            name: user_name,message:msg,like:0
      })
document.getElementById("msg").value="";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
name1=message_data['name'];
message=message_data['message'];
like=message_data['like'];

name1_tag="<h4>"+name1+"<img class='user_tick' src='tick.png'></h4>";
message_tag="<h4 class='message_h4'>"+message+"</h4>";
like_button="<button class='btn btn-warning' onclick='update(this.id)' id="+firebase_message_id+" value="+like+">";
span_tag="<span class='glyphicon glyphicon-thumbs-up'>like- "+like+"</span></button><hr>";

document.getElementById("output").innerHTML+=name1_tag+message_tag+like_button+span_tag;
//End code
      } });  }); }
getData();
function update(message_id) {
      
button_id=message_id;
likes=document.getElementById(button_id).value;
updated=Number(likes)+1;
firebase.database().ref(room_name).child(message_id).update({
     like:updated
})
}

function logout() {

localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location="index.html"
}
      


