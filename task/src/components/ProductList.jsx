
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Cart from "./Cart";


function ProductList() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);
const [showCart, setShowCart] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [sortOption, setSortOption] = useState("");

  const [total, setTotal] = useState(0);

  const limit = 10;

  // Fetch categories
  useEffect(() => {

    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });

  }, []);

  // Fetch products
  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(true);

      const skip = (currentPage - 1) * limit;

      let url;

      if (search.trim() !== "") {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
      }
      else if (category !== "") {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
      }
      else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }

      // Apply sorting
      if (sortOption !== "") {

        const [sortBy, order] = sortOption.split("-");

        url += `&sortBy=${sortBy}&order=${order}`;
      }

      fetch(url)
        .then((res) => res.json())
        .then((data) => {

          setProducts(data.products);
          setTotal(data.total);
          setLoading(false);

        });

    }, 500);

    return () => clearTimeout(timer);

  }, [currentPage, search, category, sortOption]);

  // Search handler
  function handleSearch(e) {

    setSearch(e.target.value);
    setCategory("");
    setCurrentPage(1);

  }

  // Category handler
  function handleCategory(e) {

    setCategory(e.target.value);
    setSearch("");
    setCurrentPage(1);

  }
  function addToCart(product) {

  const existingItem = cart.find(
    (item) => item.id === product.id
  );

  if (existingItem) {

    const updatedCart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);

  } else {

    setCart([...cart, { ...product, quantity: 1 }]);

  }
}

  // Sorting handler
  function handleSort(e) {

    setSortOption(e.target.value);
    setCurrentPage(1);

  }

  // Pagination handlers
  function nextPage() {

    if (currentPage < Math.ceil(total / limit)) {
      setCurrentPage(currentPage + 1);
    }

  }

  function previousPage() {

    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

  }

  if (loading) {
    return <h2>Loading products...</h2>;
  }
  if (showCart) {
  return (
    <Cart
      cart={cart}
      setCart={setCart}
      onBack={() => setShowCart(false)}
    />
  );
}

  return (

    <div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={handleSearch}
      />

      {/* Category filter */}
      <select value={category} onChange={handleCategory}>

        <option value="">All Categories</option>

        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}

      </select>

      {/* Sorting */}
      <select value={sortOption} onChange={handleSort}>

        <option value="">Sort Products</option>

        <option value="price-asc">
          Price: Low to High
        </option>

        <option value="price-desc">
          Price: High to Low
        </option>

        <option value="rating-asc">
          Rating: Low to High
        </option>

        <option value="rating-desc">
          Rating: High to Low
        </option>

      </select>
      <button onClick={() => setShowCart(true)}>
  View Cart ({cart.length})
</button>

      {/* Product Cards */}
      <div className="product-list">

        {products.length > 0 ? (

          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}

             onAddToCart={addToCart}   
            />
          ))

        ) : (

          <h3>No products found</h3>

        )}

      </div>

      {/* Pagination */}
      <div className="pagination">

        <button
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {Math.ceil(total / limit)}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(total / limit)}
        >
          Next
        </button>

      </div>

    </div>

  );

}

export default ProductList;
