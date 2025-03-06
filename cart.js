let cart = [];

function addToCart(id, name, price) {
    let product = { id, name, price };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
    updateCartDisplay();
}

function loadCart() {
    let savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    let cartContainer = document.getElementById("cartItems");
    let totalPrice = 0;
    cartContainer.innerHTML = "";
    
    cart.forEach((item, index) => {
        totalPrice += item.price;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>`;
    });
    
    document.getElementById("totalPrice").innerText = `Total: $${totalPrice}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Proceeding to checkout...");
    localStorage.removeItem("cart");
    cart = [];
    updateCartDisplay();
}

window.onload = loadCart;
