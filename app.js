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
                    <p>Category: ${product.category}</p>
                    <p>$${product.price}</p>
                    <button onclick="addToCart('${doc.id}', '${product.name}', ${product.price})">Add to Cart</button>
                </div>`;
        });
    });
}
fetchProducts();

// Search Functionality
document.getElementById("searchBar").addEventListener("input", function () {
    let searchValue = this.value.toLowerCase();
    let productCards = document.querySelectorAll(".product-card");
    
    productCards.forEach((card) => {
        let productName = card.querySelector("h3").innerText.toLowerCase();
        let productCategory = card.querySelector("p").innerText.toLowerCase();
        
        if (productName.includes(searchValue) || productCategory.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
