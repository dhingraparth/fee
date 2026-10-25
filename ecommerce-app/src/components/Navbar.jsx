import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartTotalQuantity } from '../redux/cartSlice'

export function Navbar() {
  const totalQuantity = useSelector(selectCartTotalQuantity)

  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">QuickStore</span>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'nav-link active cart-link' : 'nav-link cart-link')}
          >
            <span>Cart</span>
            <span className="cart-badge">{totalQuantity}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
