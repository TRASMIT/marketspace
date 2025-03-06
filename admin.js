function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const imageFile = document.getElementById("productImage").files[0];
    const category = document.getElementById("productCategory").value;

    if (!name || !price || !imageFile || !category) {
        alert("Please fill all fields and upload an image.");
        return;
    }

    const storageRef = firebase.storage().ref("product_images/" + imageFile.name);
    const uploadTask = storageRef.put(imageFile);

    uploadTask.on("state_changed", 
        (snapshot) => {},
        (error) => alert("Image upload failed: " + error.message),
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                db.collection("products").add({
                    name,
                    price,
                    image: downloadURL,
                    category
                })
                .then(() => alert("Product added successfully!"))
                .catch((error) => alert("Error: " + error.message));
            });
        }
    );
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
                    <p>Category: ${product.category}</p>
                    <button onclick="deleteProduct('${doc.id}')">Delete</button>
                </div>`;
        });
    });
}
loadAdminProducts();
