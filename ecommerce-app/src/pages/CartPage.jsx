import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalPrice,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../redux/cartSlice'

export function CartPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const totalQuantity = useSelector(selectCartTotalQuantity)
  const totalPrice = useSelector(selectCartTotalPrice)

  if (items.length === 0) {
    return (
      <div className="container empty-cart-container">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your Shopping Cart is Empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container cart-page">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <button onClick={() => dispatch(clearCart())} className="btn-clear-cart">
          Clear All
        </button>
      </div>

      <div className="cart-layout">
        {/* Cart Items List */}
        <div className="cart-items-list">
          {items.map((item) => (
            <div key={item.id} className="cart-item-card">
              <img src={item.image} alt={item.title} className="cart-item-img" />

              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-title">
                  {item.title}
                </Link>
                <span className="cart-item-unit-price">${item.price.toFixed(2)} each</span>
              </div>

              {/* Quantity Controls */}
              <div className="cart-quantity-controls">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="btn-qty"
                  title="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-number">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="btn-qty"
                  title="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Item Total Price */}
              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="btn-remove"
                title="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="cart-summary-card">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Items:</span>
            <span>{totalQuantity}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${totalPrice}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Shipping:</span>
            <span className="free-shipping">FREE</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>

          <Link to="/checkout" className="btn-primary btn-block">
            Proceed to Checkout →
          </Link>

          <Link to="/" className="continue-shopping-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
