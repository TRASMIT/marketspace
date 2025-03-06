function loadUserProfile() {
    let user = auth.currentUser;
    if (!user) {
        alert("Please log in to view your profile.");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("userName").innerText = user.displayName || "No Name Set";
    document.getElementById("userEmail").innerText = user.email;
    document.getElementById("profilePicture").src = user.photoURL || "default-profile.png";

    loadOrderHistory(user.uid);
}

function updateProfile() {
    let user = auth.currentUser;
    let newName = document.getElementById("editName").value;

    if (!newName) {
        alert("Please enter a new name.");
        return;
    }

    user.updateProfile({ displayName: newName })
        .then(() => {
            alert("Profile updated!");
            document.getElementById("userName").innerText = newName;
        })
        .catch((error) => {
            alert("Error updating profile: " + error.message);
        });
}

function changePassword() {
    let newPassword = document.getElementById("newPassword").value;
    let user = auth.currentUser;

    if (!newPassword) {
        alert("Please enter a new password.");
        return;
    }

    user.updatePassword(newPassword)
        .then(() => {
            alert("Password changed successfully!");
        })
        .catch((error) => {
            alert("Error changing password: " + error.message);
        });
}

function loadOrderHistory(userId) {
    let orderList = document.getElementById("orderList");
    db.collection("orders")
        .where("userId", "==", userId)
        .orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                orderList.innerHTML = "<h3>No past orders found.</h3>";
                return;
            }

            orderList.innerHTML = "";
            querySnapshot.forEach((doc) => {
                let order = doc.data();
                let itemsHTML = order.items.map(item => `
                    <div class="order-item">
                        <h4>${item.name}</h4>
                        <p>Price: $${item.price}</p>
                    </div>
                `).join("");

                orderList.innerHTML += `
                    <div class="order-card">
                        <h3>Order Date: ${new Date(order.timestamp).toLocaleString()}</h3>
                        ${itemsHTML}
                        <h4>Total: $${order.totalAmount}</h4>
                    </div>
                `;
            });
        })
        .catch((error) => {
            alert("Error loading orders: " + error.message);
        });
}

function goBack() {
    window.history.back();
}

window.onload = loadUserProfile;
