console.log("🔥 CORRECT server.js running");


const express = require("express");
const cors = require("cors");
const path = require("path");
const products = require("./apidata");


console.log("🔥 CORRECT server.js running");

const app = express();
const PORT = 7777;

app.use(cors());
app.use("/images", express.static("images"));
app.get("/", (req, res) => {
  res.send("🍦 IceCream Backend OK");
});
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/test", (req, res) => {
  res.json({ success: true });
});


// PRODUCTS API
app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});




app.listen(PORT, () => {
  console.log(`✅ Server on http://localhost:${PORT}`);
});






