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
   2. Bespoke Form Handler (Submission & Reset)
   ========================================= */
// We select the form by the ID used in your HTML: 'contactForm'
const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("form-status");

function handleBespokeSubmit(event) {
    event.preventDefault(); // Stop the page from reloading/redirecting

    const formData = new FormData(form);

    // Show loading text
    statusMsg.innerText = "Sending request...";
    statusMsg.style.color = "#555";

    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // SUCCESS: Show Thank You message
            statusMsg.innerText = "Thank you! We have received your request.";
            statusMsg.style.color = "green";
            
            // RESET: Clear the form fields for the next submission
            form.reset();
        } else {
            // ERROR: Show error message
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
        // NETWORK ERROR
        statusMsg.innerText = "Oops! Network error. Please try again.";
        statusMsg.style.color = "red";
    });
}

// Attach the listener
if (form) {
    form.addEventListener("submit", handleBespokeSubmit);
}
