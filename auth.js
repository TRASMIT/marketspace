// auth.js - Handles user authentication (Signup, Login, Logout)
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase.js"; 

const auth = getAuth(app);

// Signup Function
function signup() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Signup successful!");
            window.location.href = "index.html"; // Redirect to homepage
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Login Function
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "index.html"; // Redirect to homepage
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Logout Function
function logout() {
    signOut(auth)
        .then(() => {
            alert("Logged out successfully!");
            window.location.href = "login.html"; // Redirect to login page
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Auth State Listener (Keeps user logged in)
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("user-status").innerText = `Logged in as ${user.email}`;
        document.getElementById("logout-btn").style.display = "block";
    } else {
        document.getElementById("user-status").innerText = "Not logged in";
        document.getElementById("logout-btn").style.display = "none";
    }
});

// Export functions for use in HTML files
export { signup, login, logout };

