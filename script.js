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
   2. Bespoke Form Handler (No Redirect)
   ========================================= */

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("contactForm");
    const statusMsg = document.getElementById("form-status");

    if (form) {
        form.addEventListener("submit", function(event) {
            
            // 1. Prevent the browser from going to the new page
            event.preventDefault(); 

            // 2. Gather form data
            const formData = new FormData(form);

            // 3. Show "Sending..." message
            statusMsg.innerText = "Sending your request...";
            statusMsg.style.color = "#555";

            // 4. Send silently
            fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success!
                    statusMsg.innerText = "Thank you! We have received your request.";
                    statusMsg.style.color = "green";
                    form.reset(); // Clears the form inputs
                } else {
                    // Error
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            statusMsg.innerText = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            statusMsg.innerText = "Oops! There was a problem submitting your form.";
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

});
