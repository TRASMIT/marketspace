function fetchProducts() {
    db.collection("products").onSnapshot((snapshot) => {
        let productsContainer = document.getElementById("products");
        productsContainer.innerHTML = "";
        snapshot.forEach((doc) => {
            let product = doc.data();
            productsContainer.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart('${doc.id}', '${product.name}', ${product.price})">Add to Cart</button>
                </div>`;
        });
    });
}
fetchProducts();

function logout() {
    auth.signOut().then(() => {
        alert("Logged out successfully!");
        window.location.href = "login.html";
    });
}
