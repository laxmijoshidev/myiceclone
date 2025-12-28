document.addEventListener("DOMContentLoaded", () => {


// ================= BESTSELLER MANUAL SCROLL =================

// make function GLOBAL (important)
window.scrollBestsellerManual = function (direction) {
  const row = document.getElementById("bestsellerRow");

  if (!row) {
    console.error("bestsellerRow not found");
    return;
  }

  const card = row.querySelector(".product-card");

  if (!card) {
    console.error("product-card not found");
    return;
  }

  const gap = 60; // must match CSS gap
  const scrollAmount = card.offsetWidth + gap;

  row.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
};

  /* ================= PRODUCTS ================= */

  const productGrid = document.getElementById("productGrid");
  const cartCount = document.getElementById("cartCount");

  let cart = [];
  let products = [];

  async function fetchProducts() {
    if (!productGrid) return;

    const res = await fetch("https://dummyjson.com/products?limit=12");
    const data = await res.json();

    products = data.products.map(p => ({
      id: p.id,
      name: p.title,
      price: p.price,
      image: p.thumbnail,
      category: ["cone", "cup", "family", "premium"][p.id % 4]
    }));

    renderProducts(products);
  }

  function renderProducts(list) {
    if (!productGrid) return;

    productGrid.innerHTML = "";

    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" />
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button>Add to Cart</button>
      `;

      card.querySelector("button").onclick = () => addToCart(p.id);
      productGrid.appendChild(card);
    });
  }

  function addToCart(id) {
    const item = cart.find(p => p.id === id);

    if (item) item.qty++;
    else {
      const product = products.find(p => p.id === id);
      cart.push({ ...product, qty: 1 });
    }

    updateCartCount();
  }

  function updateCartCount() {
    if (!cartCount) return;
    cartCount.innerText = cart.reduce((s, i) => s + i.qty, 0);
  }

  fetchProducts();

  /* ================= NAVBAR ================= */

  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    });
  }

  /* ================= HERO ================= */

  const hero = document.querySelector(".hero");
  if (hero) hero.classList.add("show");

  /* ================= TESTIMONIAL SLIDER ================= */
/* ================= TESTIMONIAL SLIDER ================= */
/* ================= TESTIMONIAL SLIDER ================= */

const track = document.querySelector(".testimonial-track");
const cards = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");

if (track && cards.length > 0) {
  let index = 0;
  let direction = 1;
  const visible = 3;
  const gap = 30;

  const cardWidth = cards[0].offsetWidth + gap;
  const maxIndex = cards.length - visible;

  function updateSlider() {
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    track.style.transition = "transform 0.8s ease-in-out";

    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  setInterval(() => {
    index += direction;

    if (index >= maxIndex || index <= 0) {
      direction *= -1; // reverse direction
    }

    updateSlider();
  }, 3500);

  // DOT CLICK
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = Math.min(i, maxIndex);
      updateSlider();
    });
  });

  updateSlider();
}

// ================= NEWSLETTER FUNCTIONALITY =================
const form = document.getElementById("newsletterForm");
const emailInput = document.getElementById("newsletterEmail");
const successBox = document.getElementById("newsletterSuccess");
const againBtn = document.getElementById("subscribeAgainBtn");
const features = document.querySelector(".newsletter-features");

form.addEventListener("submit", function (event) {
  // 🚨 THIS LINE STOPS PAGE JUMP
  event.preventDefault();

  const email = emailInput.value.trim();

  if (!email || !email.includes("@")) {
    alert("Please enter a valid email");
    return;
  }

  // Hide form + features
  form.classList.add("hide");
  features?.classList.add("hide");

  // Show thank you
  successBox.style.display = "block";
});

// Subscribe again
againBtn.addEventListener("click", function () {
  successBox.style.display = "none";
  form.classList.remove("hide");
  features?.classList.remove("hide");
  emailInput.value = "";
});


});
