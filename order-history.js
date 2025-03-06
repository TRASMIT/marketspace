function loadOrderHistory() {
    let user = auth.currentUser;
    if (!user) {
        alert("Please log in to view order history.");
        window.location.href = "login.html";
        return;
    }

    let orderList = document.getElementById("orderList");
    db.collection("orders")
        .where("userId", "==", user.uid)
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

window.onload = loadOrderHistory;
