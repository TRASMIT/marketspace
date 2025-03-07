function addProduct() {
    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;
    let category = document.getElementById("productCategory").value;
    let imageFile = document.getElementById("productImage").files[0];

    if (!name || !price || !category || !imageFile) {
        alert("❌ Please fill all fields and select an image.");
        return;
    }

    let storageRef = storage.ref(`products/${imageFile.name}`);
    let uploadTask = storageRef.put(imageFile);

    uploadTask.on("state_changed",
        (snapshot) => {
            console.log("Uploading...");
        },
        (error) => {
            console.error("❌ Upload Error:", error);
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                db.collection("products").add({
                    name: name,
                    price: parseFloat(price),
                    category: category,
                    image: downloadURL,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    alert("✅ Product added successfully!");
                    document.getElementById("productName").value = "";
                    document.getElementById("productPrice").value = "";
                    document.getElementById("productCategory").value = "";
                    document.getElementById("productImage").value = "";
                }).catch(error => {
                    console.error("❌ Error adding product:", error);
                });
            });
        }
    );
}

// ✅ Delete Product
function deleteProduct(productId) {
    db.collection("products").doc(productId).delete()
        .then(() => {
            alert("✅ Product deleted successfully!");
        })
        .catch(error => {
            console.error("❌ Error deleting product:", error);
        });
}

// ✅ Load Products when Admin Page Loads
document.addEventListener("DOMContentLoaded", fetchProducts);
