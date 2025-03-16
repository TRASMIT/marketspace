document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");

    firebase.firestore().collection("products").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const product = doc.data();
                const productDiv = document.createElement("div");
                productDiv.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                    <img src="${product.image}" alt="${product.name}" width="100">
                    <button onclick="addToCart('${doc.id}')">Add to Cart</button>
                `;
                productList.appendChild(productDiv);
            });
        });
});

function addToCart(productId) {
    firebase.firestore().collection("products").doc(productId).get()
        .then(doc => {
            const product = doc.data();
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Product added to cart!");
        });
}
