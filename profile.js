document.addEventListener("DOMContentLoaded", function() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.getElementById("user-email").textContent = user.email;
        } else {
            window.location.href = "login.html";
        }
    });
});
