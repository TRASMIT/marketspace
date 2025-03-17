document.addEventListener("DOMContentLoaded", () => {
    // Ensure Firebase is initialized
    if (!firebase.apps.length) {
        alert("Firebase is not initialized. Please check firebase.js.");
        return;
    }

    // Check if user is logged in
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            alert("You must be logged in to place an order.");
            window.location.href = "login.html";
        }
    });
});

function placeOrder() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Validate inputs
    if (!name || !address) {
        alert("Please fill in all details.");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty. Add products before placing an order.");
        return;
    }

    // Get the current user
    const user = firebase.auth().currentUser;
    if (!user) {
        alert("You must be logged in to place an order.");
        window.location.href = "login.html";
        return;
    }

    // Prepare order data
    const order = {
        userId: user.uid,
        userName: name,
        shippingAddress: address,
        items: cart.map(item => item.name),
        total: cart.reduce((sum, item) => sum + item.price, 0),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Save order to Firestore
    firebase.firestore().collection("orders").add(order)
        .then(() => {
            alert("Order placed successfully!");
            localStorage.removeItem("cart"); // Clear the cart
            window.location.href = "order-history.html"; // Redirect to order history
        })
        .catch(error => {
            console.error("Error placing order: ", error);
            alert("Failed to place order. Please try again.");
        });
}
