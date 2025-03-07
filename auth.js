function signUp() {
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Signup successful! Redirecting to login...");
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

function logIn() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login successful! Redirecting to homepage...");
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

function logout() {
    auth.signOut()
        .then(() => {
            alert("Logged out successfully!");
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}



// ✅ Function to Check Authentication Status
function checkAuth() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            alert("❌ Access Denied! Redirecting to Login...");
            window.location.href = "login.html";
        }
    });
}


