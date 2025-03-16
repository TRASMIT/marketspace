document.addEventListener("DOMContentLoaded", () => {
    firebase.auth().onAuthStateChanged(user => {
        const authLinks = document.getElementById("authLinks");
        if (user) {
            authLinks.innerHTML = `<button onclick="logout()">Logout</button>`;
        } else {
            authLinks.innerHTML = `<a href="login.html">Login</a> | <a href="signup.html">Sign Up</a>`;
        }
    });
});
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    });
}
