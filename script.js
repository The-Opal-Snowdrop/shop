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
   2. Authentication Logic (Local Storage)
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {

    // Check login state on every page load
    checkLoginState();

    // --- A. REGISTER FORM ---
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

            alert("Account Created Successfully! \nPlease log in.");
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
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert(`Welcome back, ${user.name}!`);
                window.location.href = "index.html"; 
            } else {
                alert("Incorrect email or password.");
            }
        });
    }

    // --- C. FORGOT PASSWORD (Step 1: Request Link) ---
    const forgotForm = document.getElementById("forgotForm");
    if (forgotForm) {
        forgotForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const inputEmail = forgotForm.querySelector('input[name="email"]').value;
            const storedData = localStorage.getItem('opalUser');

            if (storedData) {
                const user = JSON.parse(storedData);
                if (user.email === inputEmail) {
                    // STORE THE EMAIL TEMPORARILY so we know who to update
                    sessionStorage.setItem('resetEmail', inputEmail);
                    
                    alert(`✅ (Simulation)\nEmail sent to ${inputEmail}.\n\nClick OK to simulate clicking the email link...`);
                    
                    // Redirect to the new Reset Page
                    window.location.href = "reset-password.html";
                } else {
                    alert("Email not found.");
                }
            } else {
                alert("No accounts exist.");
            }
        });
    }

    // --- D. RESET PASSWORD (Step 2: Enter New Password) ---
    const resetForm = document.getElementById("resetForm");
    if (resetForm) {
        resetForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const newPass = document.getElementById("new-password").value;
            const confirmPass = document.getElementById("confirm-new-password").value;
            
            // 1. Check matching
            if (newPass !== confirmPass) {
                alert("Passwords do not match!");
                return;
            }

            // 2. Find the user
            const emailToReset = sessionStorage.getItem('resetEmail');
            const storedData = localStorage.getItem('opalUser');

            if (storedData && emailToReset) {
                let user = JSON.parse(storedData);
                
                // 3. Update the password
                if (user.email === emailToReset) {
                    user.password = newPass;
                    localStorage.setItem('opalUser', JSON.stringify(user)); // Save back to DB
                    
                    // Clear the temporary session
                    sessionStorage.removeItem('resetEmail');
                    
                    alert("Password updated successfully! \nPlease log in with your new password.");
                    window.location.href = "login.html";
                }
            } else {
                alert("Error: Session expired. Please try requesting a reset link again.");
                window.location.href = "forgot-password.html";
            }
        });
    }

    // --- E. CONTACT FORM ---
    const contactForm = document.getElementById("contactForm");
    const statusMsg = document.getElementById("form-status");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(contactForm);
            statusMsg.innerText = "Sending your request...";
            
            fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    statusMsg.innerText = "Thank you! Request received.";
                    statusMsg.style.color = "green";
                    contactForm.reset();
                } else {
                    statusMsg.innerText = "Error submitting form.";
                }
            });
        });
    }
});

/* =========================================
   3. Helper Functions (Login State UI)
   ========================================= */

function checkLoginState() {
    const currentUserData = localStorage.getItem('currentUser');
    const accountLink = document.querySelector('.login-link');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (currentUserData && accountLink && dropdownMenu) {
        const currentUser = JSON.parse(currentUserData);
        accountLink.innerHTML = `👤 Hi, ${currentUser.name.split(' ')[0]} ▾`;
        dropdownMenu.innerHTML = `<a href="#" onclick="logout()">Sign Out</a>`;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    alert("You have been signed out.");
    window.location.href = "index.html"; 
}
