document.addEventListener("DOMContentLoaded", function() {
    const orderList = document.getElementById("order-list");
    
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const ordersRef = firebase.firestore().collection("orders").where("userId", "==", user.uid);
            ordersRef.get().then(snapshot => {
                snapshot.forEach(doc => {
                    const order = doc.data();
                    const li = document.createElement("li");
                    li.textContent = `Order: ${order.items.join(", ")} - ${order.timestamp}`;
                    orderList.appendChild(li);
                });
            });
        }
    });
});
