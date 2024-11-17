import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVbB7uBRIpFiazkODZUCZD_ViH1HOkEd0",
  authDomain: "money-wise-32641.firebaseapp.com",
  projectId: "money-wise-32641",
  storageBucket: "money-wise-32641.firebasestorage.app",
  messagingSenderId: "525677870017",
  appId: "1:525677870017:web:434d0f7e8f6d459cbb0d40",
  measurementId: "G-GW3MWE6GQC"
};

// Initialize Firebase with the config object
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };