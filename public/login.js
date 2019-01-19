firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("game").style.display = "block";
    document.getElementById("login").style.display = "none";
    var user = firebase.auth().currentUser;

    if (user != null) {
      var email_id = user.email;
      document.getElementById("text").innerHTML = "Welcome : " + email_id;
    }
  } else {
    // No user is signed in.
    document.getElementById("game").style.display = "none";
    document.getElementById("login").style.display = "block";
  }
});

function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...

      window.alert("Error : " + errorMessage);
    });

  // Timer Starts
  var seconds = 60;
  var minutes = 89;

  if ((document.getElementById("login").style.display = "none")) {
    var myTimer = setInterval(myTimer, 1000);

    function myTimer() {
      if (seconds === 0) {
        seconds = 60;
        miutes = minutes - 1;
      }

      seconds = seconds - 1;
      var time = `${minutes} : ${seconds}`;

      console.log("Timer Started");
      document.getElementById("timer").innerHTML = time;

      //Time Up
      if (minutes === 0 && seconds === 0) {
        alert("Times Up");
        logout();
        clearInterval(myTimer);
      }
    }
  }
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    });
  clearInterval(myTimer);
}
