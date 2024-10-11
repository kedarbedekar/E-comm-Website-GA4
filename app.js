// Initialize cart
let cart = [];

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    // Create product object
    let product = {
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Check if product already exists in cart
    let productExists = cart.find(item => item.name === product.name);
    
    if (productExists) {
        productExists.quantity += 1; // Increase quantity if already in cart
    } else {
        cart.push(product); // Add new product to cart
    }

    updateCartCount(); // Update the cart count in the navigation
    updateCartTotal(); // Update the cart total
    saveCart(); // Save the updated cart to localStorage
}

// Function to update the cart count in the navigation
function updateCartCount() {
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount; // Update count in the header
}

// Function to update the cart total
function updateCartTotal() {
    const cartTotal = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    const totalElement = document.getElementById('cart-total');
    if (totalElement) {
        totalElement.innerText = cartTotal.toFixed(2); // Display total price (2 decimal places)
    }
}

// Function to handle the Shop Now button click
function shopNow() {
    window.location.href = 'Running_Shoes.html'; // Redirect to the product category page
}

// Attach event listener to the Shop Now button
const shopNowButton = document.querySelector('.shop-now');
if (shopNowButton) {
    shopNowButton.addEventListener('click', shopNow);
}

// Function to view product details (redirects to individual product pages)
function viewDetails(productPage) {
    window.location.href = productPage; // Redirect to the product page
}

// Save cart data to localStorage to persist the cart between pages
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Convert cart to JSON string and save
}

// Load cart data from localStorage when the page loads
function loadCart() {
    const savedCart = localStorage.getItem('cart'); // Get cart data from localStorage
    if (savedCart) {
        cart = JSON.parse(savedCart); // Parse JSON string back into an array
        updateCartCount(); // Update cart count on load
        updateCartTotal(); // Update cart total on load
    }
}

// Call loadCart when the page loads
window.onload = loadCart;

// Save cart data when the user leaves the page
window.onbeforeunload = saveCart;

// Function to clear the cart
function clearCart() {
    cart = []; // Clear the cart array
    updateCartCount(); // Reset cart count
    updateCartTotal(); // Reset cart total
    saveCart(); // Save the empty cart to localStorage
    document.getElementById('cart-items').innerHTML = ''; // Clear cart items from the display
}
