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
  countdown();
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
   
}
