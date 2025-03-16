function placeOrder() {
    const user = firebase.auth().currentUser;
    if (!user) {
        alert("Please log in to place an order.");
        return;
    }
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    if (!name || !address) {
        alert("Please fill in all details.");
        return;
    }
    const order = {
        userId: user.uid,
        name,
        address,
        cart: JSON.parse(localStorage.getItem("cart")) || [],
        date: new Date().toISOString()
    };
    firebase.firestore().collection("orders").add(order).then(() => {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        window.location.href = "order-history.html";
    });
}
