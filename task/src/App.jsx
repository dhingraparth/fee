
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />

      <h2 className="heading">Our Products</h2>

      <ProductList />
    </div>
  );
}

export default App;
