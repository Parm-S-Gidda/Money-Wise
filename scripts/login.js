import {auth} from "../scripts/firebaseConfig.js";
import {onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';

// Example: Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in:', user);
    window.location.href = "/pages/index.html"; 
  } else {
    console.log('No user is signed in.');
  }
});

const submitSignup = document.getElementById('loginButton');

submitSignup.addEventListener("click", function (event) {

 event.preventDefault()

  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('confirmPasswordInput').value;


  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  
  // window.location.href = "https://parmgidda.ca/"; 
  window.location.href = "/pages/index.html"; 
 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;


    alert("Email or Password is Incorrect");
  });


  
});


document.getElementById('signupButton').addEventListener('click', function() {
    window.location.href = "/pages/signup.html"; // Change the URL to your desired page
});

