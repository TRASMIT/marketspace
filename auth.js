document.addEventListener("DOMContentLoaded", () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.getElementById("logout-btn").style.display = "block";
        } else {
            document.getElementById("logout-btn").style.display = "none";
        }
    });
});

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
    });
}
