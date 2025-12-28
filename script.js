// Simple Cart Logic
let cartCount = 0;
let cartTotal = 0.00;

function addToCart(productName, price) {
    // Increment Count
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    
    // Add to total
    cartTotal += price;

    // Show feedback
    alert(`${productName} added to cart! \nCurrent Total: £${cartTotal.toFixed(2)}`);
}

function toggleCart() {
    // In a real app, this would open a sidebar or modal
    if(cartCount > 0) {
        alert(`You have ${cartCount} items in your cart. Total: £${cartTotal.toFixed(2)}`);
    } else {
        alert("Your cart is empty.");
    }
}

// Bespoke Form Handler
function handleBespokeSubmit(event) {
    event.preventDefault(); // Prevents page reload
    
    // Get values (for demonstration)
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    
    // Show success message
    alert(`Thank you, ${name}! \nWe have received your bespoke request. We will contact you shortly to discuss your unique creation.`);
    
    // Reset form
    form.reset();
}
