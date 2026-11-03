import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const auth = getAuth(initializeApp(firebaseConfig));
const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');
const signupBtn = document.getElementById('signupBtn');

function friendly(code) {
  const map = {
    'auth/invalid-credential': 'Wrong email or password.',
    'auth/invalid-email': 'That email address does not look right.',
    'auth/email-already-in-use': 'An account with that email already exists. Try logging in.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Wait a bit and try again.',
    'auth/network-request-failed': 'Network problem. Check your connection.'
  };
  return map[code] || 'Something went wrong (' + code + ').';
}

const signedOut = signOut(auth).then(function () {
  return true;
}).catch(function (err) {
  msg.textContent = friendly(err.code);
  return false;
});

async function run(action) {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  try {
    if (!await signedOut) return;
    msg.textContent = '';
    await action(auth, email, password);
    window.location.href = 'phase2.html';
  } catch (err) {
    msg.textContent = friendly(err.code);
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  run(signInWithEmailAndPassword);
});
signupBtn.addEventListener('click', function () {
  if (form.reportValidity()) run(createUserWithEmailAndPassword);
});
console.log('auth.js loaded');