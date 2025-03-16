document.addEventListener("DOMContentLoaded", () => {
    const orderList = document.getElementById("order-list");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            firebase.firestore().collection("orders")
                .where("userId", "==", user.uid)
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        const order = doc.data();
                        const li = document.createElement("li");
                        li.textContent = `Order: ${order.items.join(", ")} - Total: $${order.total}`;
                        orderList.appendChild(li);
                    });
                });
        }
    });
});
