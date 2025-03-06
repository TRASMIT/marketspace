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
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            alert("Proceeding to checkout...");
            // Add checkout logic here
        } else {
            alert("You must log in to checkout.");
            window.location.href = "login.html";
        }
    });
}
