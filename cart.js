function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartList.innerHTML = "";
    let total = 0;

    cartItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${parseFloat(item.price).toFixed(2)}
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartList.appendChild(li);
        total += parseFloat(item.price);
    });

    cartTotal.textContent = `$${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    if (JSON.parse(localStorage.getItem("cart")).length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout.html";
}

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    document.getElementById("logout-btn").addEventListener("click", () => {
        if (typeof logout === "function") {
            logout();
        } else {
            alert("Logout function not found!");
        }
    });
});

