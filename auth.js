document.addEventListener("DOMContentLoaded", () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.getElementById("logout-btn").style.display = "block";
        } else {
            document.getElementById("logout-btn").style.display = "none";
        }
    });
});

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch(error => alert("Login failed: " + error.message));
}

function signup() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch(error => alert("Signup failed: " + error.message));
}

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
    });
}
