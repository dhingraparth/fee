import { useSelector, useDispatch } from 'react-redux'
import { setCategory, setSearchTerm } from '../redux/productsSlice'
import { ProductCard } from '../components/ProductCard'

const CATEGORIES = ['All', 'Audio', 'Electronics', 'Wearables', 'Accessories']

export function HomePage() {
  const dispatch = useDispatch()
  const { items, selectedCategory, searchTerm } = useSelector((state) => state.products)

  // Filter products by category and search keyword
  const filteredProducts = items.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="home-page container">
      {/* Hero Banner */}
      <section className="hero-banner">
        <h1>Discover Tech &amp; Everyday Essentials</h1>
        <p>Simple e-commerce store built with React, Redux Toolkit &amp; React Router.</p>
      </section>

      {/* Search and Category Filters */}
      <div className="filters-bar">
        {/* Search Bar */}
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products by name or feature..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={() => dispatch(setSearchTerm(''))}
              className="clear-search-btn"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try searching for something else or clear the filters.</p>
          <button
            onClick={() => {
              dispatch(setCategory('All'))
              dispatch(setSearchTerm(''))
            }}
            className="btn-primary"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
