const API_URL = "http://localhost:7777/api/products";

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

let allProducts = [];

async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    allProducts = data;
    renderProducts(allProducts);
  } catch (err) {
    console.error("❌ API Error", err);
  }
}

function renderProducts(products) {
  grid.innerHTML = "";

  products.forEach(p => {
    grid.innerHTML += `
      <div class="card">

        ${p.discount ? `<span class="discount">${p.discount}% OFF</span>` : ""}
        <img src=${p.image} alt="">
        <h3>${p.name}</h3>

        <p class="desc">${p.description}</p>

        <div class="sizes">${p.sizes?.join(", ") || ""}</div>

        <div class="rating">⭐ ${p.rating} (${p.popularity})</div>

        <div class="price">
          ₹${p.price}
          ${p.oldPrice ? `<span class="old">₹${p.oldPrice}</span>` : ""}
        </div>

        <button class="add-btn" onclick="addToCart('${p.id}')">
          Add
        </button>
      </div>
    `;
  });
}

// SEARCH
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  renderProducts(filtered);
});

// SORT
sortSelect.addEventListener("change", () => {
  let sorted = [...allProducts];

  if (sortSelect.value === "priceLow") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (sortSelect.value === "priceHigh") {
    sorted.sort((a, b) => b.price - a.price);
  }

  renderProducts(sorted);
});

// ADD TO CART (frontend only for now)
function addToCart(id) {
  alert("🛒 Added to cart");
}

fetchProducts();
fetch("http://localhost:7777/api/products")
  .then(res => res.json())
  .then(data => {
    console.log("🧊 PRODUCTS FROM API:", data);
  });







  const card = document.createElement("div");
card.className = "product-card";

card.innerHTML = `
  <div class="product-image">
    <img src="${product.image}" alt="${product.name}">
    <div class="hover-icons">
      <span>❤️</span>
      <span>👁</span>
    </div>
  </div>

  <h3>${product.name}</h3>
  <p>${product.tagline}</p>

  <div class="price">
    <span class="new">₹${product.discountedPrice}</span>
    <span class="old">₹${product.price}</span>
  </div>

  <button>Add</button>
`;
