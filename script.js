/* =========================================
   1. Shopping Cart Logic
   ========================================= */
let cartCount = 0;
let cartTotal = 0.00;

function addToCart(productName, price) {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    cartTotal += price;
    alert(`${productName} added to cart! \nCurrent Total: £${cartTotal.toFixed(2)}`);
}

function toggleCart() {
    if(cartCount > 0) {
        alert(`You have ${cartCount} items in your cart. \nTotal: £${cartTotal.toFixed(2)} \n\n(Checkout feature coming soon!)`);
    } else {
        alert("Your cart is empty.");
    }
}

/* =========================================
   2. Form Handlers (Wait for Page Load)
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {

    // --- BESPOKE FORM ---
    const contactForm = document.getElementById("contactForm");
    const statusMsg = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Stop redirect
            const formData = new FormData(contactForm);

            statusMsg.innerText = "Sending your request...";
            statusMsg.style.color = "#555";

            fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    statusMsg.innerText = "Thank you! We have received your request.";
                    statusMsg.style.color = "green";
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            statusMsg.innerText = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            statusMsg.innerText = "Oops! Problem submitting form.";
                        }
                        statusMsg.style.color = "red";
                    });
                }
            })
            .catch(error => {
                statusMsg.innerText = "Oops! Network error. Please try again.";
                statusMsg.style.color = "red";
            });
        });
    }

    // --- LOGIN FORM ---
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Login Successful! (This is a demo)");
            window.location.href = "index.html"; // Redirect to home
        });
    }

});
