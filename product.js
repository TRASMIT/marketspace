document.addEventListener("DOMContentLoaded", function() {
    const productDetails = document.getElementById("product-details");
    const productId = new URLSearchParams(window.location.search).get("id");

    if (productId) {
        firebase.firestore().collection("products").doc(productId).get().then(doc => {
            if (doc.exists) {
                const product = doc.data();
                productDetails.innerHTML = `<h2>${product.name}</h2><p>${product.description}</p><p>Price: $${product.price}</p>`;
            }
        });
    }
});

function addToCart() {
    alert("Product added to cart!");
}
