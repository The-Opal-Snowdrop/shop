document.addEventListener("DOMContentLoaded", function() {

    // --- 1. BESPOKE CONTACT FORM ---
    const contactForm = document.getElementById("contactForm");
    const statusMsg = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
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
                    statusMsg.innerText = "Oops! Problem submitting form.";
                    statusMsg.style.color = "red";
                }
            })
            .catch(error => {
                statusMsg.innerText = "Network error. Please try again.";
                statusMsg.style.color = "red";
            });
        });
    }

    // --- 2. LOGIN FORM ---
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Login Successful! (This is a demo)");
            window.location.href = "index.html"; 
        });
    }

    // --- 3. NEW: REGISTER FORM LOGIC ---
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            // Get the values
            const password = document.getElementById("reg-password").value;
            const confirm = document.getElementById("reg-confirm").value;

            // Check if passwords match
            if (password !== confirm) {
                alert("Passwords do not match! Please try again.");
                return; // Stop here
            }

            // Success
            alert("Account Created Successfully! \nWelcome to The Opal Snowdrop.");
            window.location.href = "index.html"; // Redirect to home
        });
    }
});

// --- SHOPPING CART LOGIC (Keep this outside the event listener) ---
let cartCount = 0;
let cartTotal = 0.00;

function addToCart(productName, price) {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    cartTotal += price;
    alert(`${productName} added to cart! \nTotal: £${cartTotal.toFixed(2)}`);
}

function toggleCart() {
    if(cartCount > 0) {
        alert(`You have ${cartCount} items in your cart. \nTotal: £${cartTotal.toFixed(2)}`);
    } else {
        alert("Your cart is empty.");
    }
}
