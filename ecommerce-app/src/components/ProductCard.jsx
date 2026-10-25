import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'

export function ProductCard({ product }) {
  const dispatch = useDispatch()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart(product))
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
        <span className="product-category-tag">{product.category}</span>
      </Link>

      <div className="product-info">
        <div className="product-rating">
          <span>★</span> {product.rating} / 5.0
        </div>

        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-title">{product.title}</h3>
        </Link>

        <p className="product-description">{product.description}</p>

        <div className="product-bottom">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button onClick={handleAddToCart} className="btn-add-cart">
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
