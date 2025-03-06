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
    alert("Order placed successfully! Redirecting to homepage...");
    localStorage.removeItem("cart");
    window.location.href = "index.html"; // Redirect after checkout
}

function goBack() {
    window.history.back();
}

window.onload = loadCheckout;

