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
   2. Bespoke Form Handler (Prevents Redirect)
   ========================================= */

// We wrap this in an event listener to make sure the HTML is loaded first
document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("contactForm");
    const statusMsg = document.getElementById("form-status");

    // Only run this code if the form actually exists on the page
    if (form) {
        form.addEventListener("submit", function(event) {
            
            // 1. STOP the form from redirecting to a new page
            event.preventDefault(); 

            // 2. Gather the data
            const formData = new FormData(form);

            // 3. Update the UI to show we are working
            statusMsg.innerText = "Sending request...";
            statusMsg.style.color = "#555";

            // 4. Send the data silently using Fetch
            fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success: Show message and Reset Form
                    statusMsg.innerText = "Thank you! We have received your request.";
                    statusMsg.style.color = "green";
                    form.reset(); 
                } else {
                    // Error from server
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
                // Network error
                statusMsg.innerText = "Oops! Network error. Please try again.";
                statusMsg.style.color = "red";
            });
        });
    }

});
