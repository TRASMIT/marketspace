function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const image = document.getElementById("productImage").value;
    
    db.collection("products").add({ name, price, image })
        .then(() => alert("Product added successfully!"))
        .catch((error) => alert("Error: " + error.message));
}

function loadAdminProducts() {
    db.collection("products").onSnapshot((snapshot) => {
        document.getElementById("adminProducts").innerHTML = "";
        snapshot.forEach((doc) => {
            const product = doc.data();
            document.getElementById("adminProducts").innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="deleteProduct('${doc.id}')">Delete</button>
                </div>`;
        });
    });
}
loadAdminProducts();
