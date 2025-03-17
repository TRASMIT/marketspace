function placeOrder() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!name || !address || cart.length === 0) {
    alert("Please fill in all details and ensure your cart is not empty.");
    return;
  }

  const order = {
    userId: firebase.auth().currentUser.uid,
    items: cart.map(item => item.name),
    total: cart.reduce((sum, item) => sum + item.price, 0),
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  db.collection("orders").add(order)
    .then(() => {
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      window.location.href = "order-history.html";
    })
    .catch(error => {
      console.error("Error placing order: ", error);
      alert("Failed to place order. Please try again.");
    });
}
