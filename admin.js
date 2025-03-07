// ✅ Function to Add Product to Firebase
function addProduct() {
    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;
    let category = document.getElementById("productCategory").value;
    let imageInput = document.getElementById("productImage");

    if (!name || !price || !category || !imageInput.files.length) {
        alert("❌ Please fill in all fields and upload an image.");
        return;
    }

    let file = imageInput.files[0];
    let storageRef = firebase.storage().ref("productImages/" + file.name);
    
    // ✅ Upload Image to Firebase Storage
    storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageURL) => {
            db.collection("products").add({
                name: name,
                price: parseFloat(price),
                category: category,
                image: imageURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                alert("✅ Product Added Successfully!");
                document.getElementById("productName").value = "";
                document.getElementById("productPrice").value = "";
                document.getElementById("productCategory").value = "";
                document.getElementById("productImage").value = "";
            }).catch(error => {
                console.error("❌ Error adding product:", error);
            });
        });
    }).catch(error => {
        console.error("❌ Image Upload Error:", error);
    });
}

// ✅ Function to Load Admin Products
function loadAdminProducts() {
    console.log("📌 Loading Admin Products...");

    if (!window.db) {
        console.error("❌ Firebase not initialized yet!");
        return;
    }

    db.collection("products").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        let adminProductsContainer = document.getElementById("adminProducts");
        if (adminProductsContainer) {
            adminProductsContainer.innerHTML = "";
            snapshot.forEach((doc) => {
                let product = doc.data();
                adminProductsContainer.innerHTML += `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>$${product.price}</p>
                        <button onclick="deleteProduct('${doc.id}')">Delete</button>
                    </div>`;
            });
        }
        console.log("✅ Admin Products Loaded Successfully!");
    });
}

// ✅ Function to Delete Product
function deleteProduct(productId) {
    db.collection("products").doc(productId).delete()
    .then(() => {
        alert("✅ Product Deleted Successfully!");
    })
    .catch(error => {
        console.error("❌ Error deleting product:", error);
    });
}

// ✅ Load Admin Products
window.onload = function () {
    loadAdminProducts();
};
