import {auth} from "../scripts/firebaseConfig.js";
import {onAuthStateChanged, signOut, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';

// Example: Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in:', user);
    window.location.href = "/pages/index.html";
  } else {
    console.log('No user is signed in.');
  }
});

const submitSignup = document.getElementById('signupButton2');

if(submitSignup){
  submitSignup.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.href = "/pages/login.html"; 

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("error: " + errorCode)

    });

    
  });

  document.getElementById('loginButton2').addEventListener('click', function() {
    window.location.href = "/pages/login.html"; 
});
}






