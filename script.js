/* =========================================
   1. Shopping Cart Logic (Enhanced)
   ========================================= */

// Helper: Get cart from storage
function getCart() {
    return JSON.parse(localStorage.getItem('opalCart')) || [];
}

// Helper: Save cart to storage
function saveCart(cart) {
    localStorage.setItem('opalCart', JSON.stringify(cart));
    updateCartCount();
}

// 1. Add Item to Cart
function addToCart(productName, price) {
    let cart = getCart();
    cart.push({ name: productName, price: price });
    saveCart(cart);
    
    alert(`${productName} added to cart!`);
}

// 2. Remove Item from Cart
function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1); // Remove item at specific index
    saveCart(cart);
    renderCartPage(); // Refresh the visual list
}

// 3. Update the little "Cart (0)" number in the Navbar
function updateCartCount() {
    const cart = getCart();
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = cart.length;
    }
}

// 4. Calculate Total Price
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.price, 0);
}

// 5. Navigate to Cart Page
function toggleCart() {
    window.location.href = "cart.html";
}

/* =========================================
   2. Page Load Logic & Event Listeners
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {
    
    // Always update the cart number in navbar on load
    updateCartCount();
    checkLoginState();

    // --- A. RENDER CART PAGE (Only if we are on cart.html) ---
    if (window.location.pathname.includes("cart.html")) {
        renderCartPage();
    }

    // --- B. CHECKOUT FORM ---
    const checkoutForm = document.getElementById("checkoutForm");
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            // Simulation: Clear Cart and Redirect
            localStorage.removeItem('opalCart'); 
            window.location.href = "success.html"; 
        });
    }

    // --- C. AUTHENTICATION (Login/Register/Reset) ---
    // (Previous Auth Logic - Kept Simple for brevity)
    const registerForm = document.getElementById("registerForm");
    if (registerForm) handleRegister(registerForm);

    const loginForm = document.getElementById("loginForm");
    if (loginForm) handleLogin(loginForm);
    
    // Logout function
    window.logout = function() {
        localStorage.removeItem('currentUser');
        window.location.href = "index.html";
    };
});

/* =========================================
   3. Render Functions (Visuals)
   ========================================= */

function renderCartPage() {
    const cartContainer = document.getElementById("cart-items-container");
    const cartTotalElement = document.getElementById("cart-total-price");
    
    if (!cartContainer) return; // Not on cart page

    const cart = getCart();
    cartContainer.innerHTML = ""; // Clear current list

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalElement.innerText = "0.00";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <div class="cart-right">
                <span>£${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})" class="btn-remove">X</button>
            </div>
        `;
        cartContainer.appendChild(itemDiv);
    });

    cartTotalElement.innerText = total.toFixed(2);
}

// --- Auth Handlers (Shortened to fit) ---
function handleRegister(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // ... (Your existing logic) ...
        alert("Account created! Go to Login.");
        window.location.href = "login.html";
    });
}

function handleLogin(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // ... (Your existing logic) ...
        const user = { name: "Demo User" }; // Simulating user
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = "index.html";
    });
}

function checkLoginState() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        const link = document.querySelector('.login-link');
        const menu = document.querySelector('.dropdown-menu');
        if (link) link.innerText = `👤 Hi, ${user.name.split(' ')[0]} ▾`;
        if (menu) menu.innerHTML = `<a href="#" onclick="logout()">Sign Out</a>`;
    }
}
