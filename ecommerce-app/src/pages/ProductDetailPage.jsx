import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'

export function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [addedMessage, setAddedMessage] = useState(false)

  // Find product from Redux store by id
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === Number(id))
  )

  if (!product) {
    return (
      <div className="container error-container">
        <h2>Product Not Found</h2>
        <p>Sorry, the product you are looking for does not exist.</p>
        <Link to="/" className="btn-primary">
          ← Back to Shop
        </Link>
      </div>
    )
  }

  const handleAdd = () => {
    dispatch(addToCart(product))
    setAddedMessage(true)
    setTimeout(() => setAddedMessage(false), 2500)
  }

  return (
    <div className="container product-detail-page">
      <Link to="/" className="back-link">
        ← Back to all products
      </Link>

      <div className="detail-card">
        <div className="detail-image-box">
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-rating">
            <span className="star">★</span> {product.rating} / 5.0 (Customer Reviews)
          </div>

          <div className="detail-price">${product.price.toFixed(2)}</div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-actions">
            <button onClick={handleAdd} className="btn-primary btn-large">
              + Add to Cart
            </button>
            <Link to="/cart" className="btn-secondary btn-large">
              View Cart
            </Link>
          </div>

          {addedMessage && (
            <div className="toast-success">
              ✓ Successfully added <strong>{product.title}</strong> to your cart!
            </div>
          )}

          <div className="detail-features">
            <div className="feature-item">
              <span>🚚</span> Free Express Shipping on orders over $50
            </div>
            <div className="feature-item">
              <span>🛡️</span> 1-Year Official Brand Warranty
            </div>
            <div className="feature-item">
              <span>🔄</span> 30-Day Hassle-Free Returns
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
