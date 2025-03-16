function placeOrder() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;

    if (!name || !address) {
        alert("Please fill in all details.");
        return;
    }

    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "order-history.html";
}
