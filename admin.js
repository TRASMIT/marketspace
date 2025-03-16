document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const image = document.getElementById("product-image").value;

    if (!name || !price || !image) {
        alert("Please fill all fields");
        return;
    }

    const productRef = firebase.firestore().collection("products");
    productRef.add({ name, price, image })
        .then(() => {
            alert("Product added successfully!");
            loadProducts();
        })
        .catch(error => console.error("Error adding product: ", error));
}

function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    firebase.firestore().collection("products").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const product = doc.data();
                const li = document.createElement("li");
                li.innerHTML = `${product.name} - $${product.price}`;
                productList.appendChild(li);
            });
        });
}

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
    });
}
