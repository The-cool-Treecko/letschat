// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCUAnwEk1xyxfFxhvxlK0IltpmSNkH1eK4",
    authDomain: "kwitter-d2794.firebaseapp.com",
    databaseURL: "https://kwitter-d2794-default-rtdb.firebaseio.com",
    projectId: "kwitter-d2794",
    storageBucket: "kwitter-d2794.appspot.com",
    messagingSenderId: "752601801527",
    appId: "1:752601801527:web:1973cf814460135a13f0b2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
          document.getElementById("rooms").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                Room_names = childKey;
                console.log("roomname - " + Room_names);
                room = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><br><hr>";
                document.getElementById("rooms").innerHTML += room;
          });
    });
}
getData();

function addRoom() {
    room = document.getElementById("newRoom").value;
    console.log(room);
    localStorage.setItem("room-name", room);
    firebase.database().ref("/").child(room).update({
          purpose: "adding the room"
    });
    window.location = "kwitter_page.html";
}

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room-name", name);
    window.location = "kwitter_page.html";
}