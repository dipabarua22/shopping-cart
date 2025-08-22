const productList = document.getElementById("productList");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");

// Render products
function renderProducts(list) {
  productList.innerHTML = "";
  list.forEach(product => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded-lg shadow hover:shadow-lg hover:scale-105 transition";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded">
      <h3 class="text-lg font-bold mt-2">${product.name}</h3>
      <p class="text-sm text-gray-500 mt-1">${product.description}</p> <!-- Short description here -->
      <p class="text-gray-600 mt-1">৳ ${product.price}</p>
      <button onclick="addToCart(${product.id})" class="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    `;
    productList.appendChild(div);
  });
}


// Render categories
function renderCategories() {
  const categories = ["all", ...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// Update Cart UI
function updateCartUI() {
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "flex justify-between items-center border-b pb-2";
    div.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <div>
        <input type="number" min="1" value="${item.quantity}" 
          onchange="updateQuantity(${item.id}, this.value)" class="w-12 border rounded px-1">
        <button onclick="removeFromCart(${item.id})" class="text-red-500 ml-2">✖</button>
      </div>
    `;
    cartItems.appendChild(div);
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = calculateTotal();
}

// Search
searchBox.addEventListener("input", () => {
  const query = searchBox.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

// Filter by category
categoryFilter.addEventListener("change", () => {
  const category = categoryFilter.value;
  const filtered = category === "all" ? products : products.filter(p => p.category === category);
  renderProducts(filtered);
});

// Cart Modal toggle
document.getElementById("viewCartBtn").addEventListener("click", () => {
  cartModal.classList.remove("hidden");
});
document.getElementById("closeCart").addEventListener("click", () => {
  cartModal.classList.add("hidden");
});
document.getElementById("clearCart").addEventListener("click", clearCart);

// Initializing 
renderCategories();
renderProducts(products);
