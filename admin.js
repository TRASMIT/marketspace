document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

// ✅ Function to Add a Product
function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const category = document.getElementById("productCategory").value;
    const imageFile = document.getElementById("productImage").files[0];

    if (!name || !price || !category || !imageFile) {
        alert("❌ Please fill all fields!");
        return;
    }

    const storageRef = storage.ref().child("productImages/" + imageFile.name);
    storageRef.put(imageFile).then(snapshot => {
        return snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
        return db.collection("products").add({
            name: name,
            price: parseFloat(price),
            category: category,
            image: downloadURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }).then(() => {
        alert("✅ Product added successfully!");
        fetchProducts(); // Refresh product list
    }).catch(error => {
        console.error("❌ Error adding product:", error);
    });
}

// ✅ Function to Fetch & Display Products
function fetchProducts() {
    db.collection("products").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
        let adminProducts = document.getElementById("adminProducts");
        adminProducts.innerHTML = "";

        snapshot.forEach(doc => {
            let product = doc.data();
            adminProducts.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                    <p>Category: ${product.category}</p>
                </div>`;
        });

        console.log("✅ Products Loaded Successfully!");
    });
}
