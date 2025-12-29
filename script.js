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
        alert(`You have ${cartCount} items in your cart. \nTotal: £${cartTotal.toFixed(2)}`);
    } else {
        alert("Your cart is empty.");
    }
}

/* =========================================
   2. Form Handlers & Authentication
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {

    // --- A. REGISTER FORM (Create Account) ---
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Stop page reload
            
            // 1. Get values from the inputs
            const fullname = registerForm.querySelector('input[name="fullname"]').value;
            const email = registerForm.querySelector('input[name="email"]').value;
            const password = document.getElementById("reg-password").value;
            const confirm = document.getElementById("reg-confirm").value;

            // 2. Validate Password Match
            if (password !== confirm) {
                alert("Passwords do not match!");
                return;
            }

            // 3. Save to Local Storage (The "Mock Database")
            // We create a simple object to represent the user
            const user = {
                name: fullname,
                email: email,
                password: password // In a real app, never store passwords like this!
            };

            // Save it as a string
            localStorage.setItem('opalUser', JSON.stringify(user));

            alert("Account Created Successfully! \nYou can now log in.");
            window.location.href = "login.html"; // Send them to login page
        });
    }

    // --- B. LOGIN FORM ---
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const inputEmail = loginForm.querySelector('input[type="email"]').value;
            const inputPassword = loginForm.querySelector('input[type="password"]').value;

            // 1. Get the stored user from Local Storage
            const storedData = localStorage.getItem('opalUser');

            if (!storedData) {
                alert("No account found! Please create an account first.");
                return;
            }

            const user = JSON.parse(storedData);

            // 2. Check credentials
            if (inputEmail === user.email && inputPassword === user.password) {
                alert(`Welcome back, ${user.name}!`);
                window.location.href = "index.html"; // Redirect to home
            } else {
                alert("Incorrect email or password.");
            }
        });
    }

    // --- C. CONTACT FORM ---
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
});
