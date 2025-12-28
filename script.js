/* =========================================
   1. Shopping Cart Logic
   ========================================= */
let cartCount = 0;
let cartTotal = 0.00;

function addToCart(productName, price) {
    // Increment Count
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    
    // Add to total
    cartTotal += price;

    // Show feedback (Simulated)
    // In a real e-commerce store, this would add the item to a database or local storage
    alert(`${productName} added to cart! \nCurrent Total: £${cartTotal.toFixed(2)}`);
}

function toggleCart() {
    if(cartCount > 0) {
        alert(`You have ${cartCount} items in your cart. \nTotal: £${cartTotal.toFixed(2)} \n\n(Checkout feature coming soon!)`);
    } else {
        alert("Your cart is empty. Time to add some scents!");
    }
}

/* =========================================
   2. Bespoke Form Handler (FormSubmit + AJAX)
   ========================================= */
const form = document.getElementById("bespoke-form");
const statusMsg = document.getElementById("form-status");

function handleBespokeSubmit(event) {
    event.preventDefault(); // Prevents the page from refreshing or redirecting

    const formData = new FormData(form);

    // Update UI to show we are working
    statusMsg.innerText = "Sending your request...";
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
            // Success!
            statusMsg.innerText = "Thank you! We have received your request and will be in touch shortly.";
            statusMsg.style.color = "green";
            form.reset(); // Clear the form fields
        } else {
            // Server returned an error (like spam detection)
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
        statusMsg.innerText = "Oops! There was a network problem. Please try again later.";
        statusMsg.style.color = "red";
    });
}

// Attach the listener to the form
if (form) {
    form.addEventListener("submit", handleBespokeSubmit);
}
