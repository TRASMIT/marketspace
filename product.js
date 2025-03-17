function loadProducts() {
  const productList = document.getElementById("product-list");

  db.collection("products").get()
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
    })
    .catch(error => {
      console.error("Error loading products: ", error);
    });
}

function addToCart(productId) {
  db.collection("products").doc(productId).get()
    .then(doc => {
      const product = doc.data();
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart!");
    })
    .catch(error => {
      console.error("Error adding to cart: ", error);
    });
}

// Call the function to load products when the page loads
document.addEventListener("DOMContentLoaded", loadProducts);
