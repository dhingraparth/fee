import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotalPrice, clearCart } from '../redux/cartSlice'

export function CheckoutPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const totalPrice = useSelector(selectCartTotalPrice)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
  })

  const [errors, setErrors] = useState({})
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error on type
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Validate form fields
  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.address.trim()) newErrors.address = 'Street address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal / PIN Code is required'
    return newErrors
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Generate mock order number and clear cart
    const generatedOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000)
    setOrderId(generatedOrderId)
    setOrderPlaced(true)
    dispatch(clearCart())
  }

  // If order was placed, show confirmation screen
  if (orderPlaced) {
    return (
      <div className="container confirmation-page">
        <div className="confirmation-card">
          <div className="confirmation-icon">🎉</div>
          <h1>Order Placed Successfully!</h1>
          <p className="order-id-badge">Order ID: {orderId}</p>
          <p className="confirmation-text">
            Thank you, <strong>{formData.fullName}</strong>. We have sent a confirmation receipt to{' '}
            <strong>{formData.email}</strong>.
          </p>

          <div className="confirmation-details">
            <p>
              <strong>Shipping to:</strong> {formData.address}, {formData.city} -{' '}
              {formData.postalCode}
            </p>
            <p>
              <strong>Payment Method:</strong>{' '}
              {formData.paymentMethod === 'card'
                ? 'Credit / Debit Card'
                : formData.paymentMethod === 'upi'
                ? 'UPI / Net Banking'
                : 'Cash on Delivery'}
            </p>
            <p>
              <strong>Estimated Delivery:</strong> Within 3–5 Business Days
            </p>
          </div>

          <Link to="/" className="btn-primary">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  // If cart is empty and user visits checkout directly
  if (items.length === 0) {
    return (
      <div className="container empty-cart-container">
        <h2>Your Cart is Empty</h2>
        <p>You cannot checkout with an empty cart.</p>
        <Link to="/" className="btn-primary">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container checkout-page">
      <h1>Checkout &amp; Payment</h1>

      <div className="checkout-layout">
        {/* Left: Shipping Form */}
        <form onSubmit={handleSubmit} className="checkout-form-card" noValidate>
          <h2>Shipping Information</h2>

          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. rahul@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Street Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="House / Flat No., Street, Area"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'input-error' : ''}
            />
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="e.g. Chandigarh"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'input-error' : ''}
              />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal / PIN Code *</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="e.g. 160001"
                value={formData.postalCode}
                onChange={handleChange}
                className={errors.postalCode ? 'input-error' : ''}
              />
              {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
            </div>
          </div>

          <h2>Payment Method</h2>
          <div className="payment-options">
            <label className="radio-label">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={handleChange}
              />
              <span>Credit / Debit Card</span>
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={formData.paymentMethod === 'upi'}
                onChange={handleChange}
              />
              <span>UPI / Net Banking</span>
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === 'cod'}
                onChange={handleChange}
              />
              <span>Cash on Delivery (COD)</span>
            </label>
          </div>

          <button type="submit" className="btn-primary btn-block btn-place-order">
            Place Order (${totalPrice})
          </button>
        </form>

        {/* Right: Order Summary */}
        <div className="checkout-summary-card">
          <h2>Order Items ({items.length})</h2>

          <div className="checkout-items-list">
            {items.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.title} className="checkout-item-img" />
                <div className="checkout-item-info">
                  <p className="checkout-item-name">{item.title}</p>
                  <p className="checkout-item-qty">Qty: {item.quantity}</p>
                </div>
                <span className="checkout-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${totalPrice}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span className="free-shipping">FREE</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span>Total Payable:</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
