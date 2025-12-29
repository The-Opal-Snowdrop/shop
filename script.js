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
            event.preventDefault();
            
            const fullname = registerForm.querySelector('input[name="fullname"]').value;
            const email = registerForm.querySelector('input[name="email"]').value;
            const password = document.getElementById("reg-password").value;
            const confirm = document.getElementById("reg-confirm").value;

            if (password !== confirm) {
                alert("Passwords do not match!");
                return;
            }

            const user = { name: fullname, email: email, password: password };
            localStorage.setItem('opalUser', JSON.stringify(user));

            alert("Account Created Successfully! \nYou can now log in.");
            window.location.href = "login.html"; 
        });
    }

    // --- B. LOGIN FORM ---
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const inputEmail = loginForm.querySelector('input[type="email"]').value;
            const inputPassword = loginForm.querySelector('input[type="password"]').value;

            const storedData = localStorage.getItem('opalUser');

            if (!storedData) {
                alert("No account found! Please create an account first.");
                return;
            }

            const user = JSON.parse(storedData);

            if (inputEmail === user.email && inputPassword === user.password) {
                alert(`Welcome back, ${user.name}!`);
                window.location.href = "index.html"; 
            } else {
                alert("Incorrect email or password.");
            }
        });
    }

    // --- C. FORGOT PASSWORD FORM (New) ---
    const forgotForm = document.getElementById("forgotForm");
    if (forgotForm) {
        forgotForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const inputEmail = forgotForm.querySelector('input[name="email"]').value;
            const storedData = localStorage.getItem('opalUser');

            // Check if user exists in our "Mock Database"
            if (storedData) {
                const user = JSON.parse(storedData);
                if (user.email === inputEmail) {
                    alert(`✅ A password reset link has been sent to ${inputEmail}\n(Check your inbox!)`);
                    // In a real app, this sends an email. 
                    // In this demo, we just show the success message.
                    window.location.href = "login.html";
                } else {
                    alert("We could not find an account with that email address.");
                }
            } else {
                alert("No accounts exist yet. Please create one first.");
            }
        });
    }

    // --- D. CONTACT FORM ---
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
