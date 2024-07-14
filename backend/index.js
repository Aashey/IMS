// index.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy data for initial testing
let products = [
  {
    id: 1,
    name: "Product 1",
    category: "Category 1",
    brand: "A",
    price: 10.99,
    color: "Red",
    size: "M",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category 2",
    brand: "B",
    price: 19.99,
    color: "Blue",
    size: "L",
  },
  {
    id: 3,
    name: "Product 3",
    category: "Category 1",
    brand: "C",
    price: 25.99,
    color: "Green",
    size: "S",
  },
];

// Define routes for CRUD operations
app.get("/api/products", (req, res) => {
  res
    .status(200)
    .json({ message: "Products Fetched Successfully !", products });
});

app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ message: "Product Fetched Successfully !", product });
});

app.post("/api/products", (req, res) => {
  const product = req.body;
  product.id = products.length + 1;
  products.push(product);
  res.status(201).json({ message: "Product Added Succesfully !", product });
});

app.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedProduct = req.body;
  let found = false;
  products = products.map((p) => {
    if (p.id === id) {
      found = true;
      return { ...updatedProduct, id };
    }
    return p;
  });
  if (!found) {
    return res.status(404).json({ message: "Product not found" });
  }
  res
    .status(200)
    .json({ message: "Product Updated Successfully !", updatedProduct });
});

app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(index, 1);
  res.status(200).json({ message: "Product Deleted Successfully !", id });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
