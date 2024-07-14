import "./App.css";
import Dashboard from "./components/dashboard";
import Items from "./components/items";
import Stock from "./components/stock";
import PurchaseItem from "./components/purchase";
import SalesItem from "./components/sales";
function App() {
  const products = [
    {
      id: "1",
      name: "Classic T-Shirt",
      category: "Clothing",
      brand: "Brand A",
      price: 19.99,
      color: "Red",
      size: "M",
    },
    {
      id: "2",
      name: "Running Shoes",
      category: "Footwear",
      brand: "Brand B",
      price: 49.99,
      color: "Black",
      size: "10",
    },
    {
      id: "3",
      name: "Leather Wallet",
      category: "Accessories",
      brand: "Brand C",
      price: 29.99,
      color: "Brown",
      size: "One Size",
    },
    {
      id: "4",
      name: "Winter Jacket",
      category: "Clothing",
      brand: "Brand D",
      price: 99.99,
      color: "Blue",
      size: "L",
    },
  ];
  return (
    <>
      {/* <Dashboard /> */}
      <Items items={products} />
      {/* <Stock />
      <PurchaseItem />
      <SalesItem /> */}
    </>
  );
}

export default App;
