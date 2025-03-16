document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartList.innerHTML = "";
    let total = 0;

    cartItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - $${item.price} <button onclick="removeItem(${index})">Remove</button>`;
        cartList.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    window.location.href = "checkout.html";
}
