let cart = [];

// Add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

// Remove item
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

// Update quantity
function updateQuantity(productId, quantity) {
  const item = cart.find(p => p.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    updateCartUI();
  }
}

// Clear cart
function clearCart() {
  cart = [];
  updateCartUI();
}

// Calculate total with discount
function calculateTotal() {
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  total = total - (total * discount); // apply discount (discount comes from ui.js)
  return total;
}
