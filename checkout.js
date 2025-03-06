function loadCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let checkoutContainer = document.getElementById("checkoutSummary");
    let totalAmount = 0;

    if (cart.length === 0) {
        checkoutContainer.innerHTML = "<h3>Your cart is empty.</h3>";
        return;
    }

    checkoutContainer.innerHTML = "";
    cart.forEach((item) => {
        totalAmount += item.price;
        checkoutContainer.innerHTML += `
            <div class="checkout-item">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
            </div>`;
    });

    document.getElementById("totalAmount").innerText = `Total: $${totalAmount}`;
}

function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let user = auth.currentUser; // Get logged-in user
    if (!user) {
        alert("Please log in to place an order.");
        window.location.href = "login.html";
        return;
    }

    let orderData = {
        userId: user.uid,
        items: cart,
        totalAmount: cart.reduce((sum, item) => sum + item.price, 0),
        timestamp: new Date().toISOString()
    };

    db.collection("orders").add(orderData)
        .then(() => {
            alert("Order placed successfully!");
            localStorage.removeItem("cart");
            window.location.href = "order-history.html"; // Redirect to order history
        })
        .catch((error) => {
            alert("Error placing order: " + error.message);
        });
}


function goBack() {
    window.history.back();
}

window.onload = loadCheckout;

