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

var room_name = localStorage.getItem("room-name");
var userName = localStorage.getItem("User Name")

function send() {
      message = document.getElementById("message").value;
      document.getElementById("message").value = "";
      firebase.database().ref(room_name).push({
            user: userName,
            msg: message,
            like: 0
      });
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("rooms").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        username = message_data['user'];
                        message = message_data['msg'];
                        likes = message_data['like'];
                        console.log(username, message, likes);
                        name_display = "<h4>" + username + "<img class= 'user_tick' src='tick.png'></h4>";
                        message_display = "<h4 class='message_h4'>" + message + "</h4>"
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + likes + " onclick='updateLike(this.id)'>";
                        like_span = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + likes + "</span></button><hr>";
                        row = name_display + message_display + like_button + like_span;
                        document.getElementById("rooms").innerHTML += row;
                  }
            });
      });
}

getData()

function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });

}

function logout() {
      localStorage.removeItem("User Name");
      localStorage.removeItem("room-name");
      window.location = "index.html";
}