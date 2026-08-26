import { useState } from 'react'
import './App.css'

const products = [
  { id: 1, name: 'T-Shirt', price: 499, emoji: '👕' },
  { id: 2, name: 'Shoes', price: 1299, emoji: '👟' },
  { id: 3, name: 'Cap', price: 299, emoji: '🧢' },
]

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => setCart([...cart, product])
  
  const removeFromCart = (product) => setCart(cart.filter((item) => item.id !== product.id))
  const total = cart.reduce((sum, product) => sum + product.price, 0)

  return (
    <main className="shop">
      <h1>Simple Shop</h1>
      <p className="subtitle">Choose a product and add it to your cart.</p>

      <section className="products">
        {products.map((product) => (
          <article className="product" key={product.id}>
            <div className="product-image">{product.emoji}</div>
            <h2>{product.name}</h2>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </article>
        ))}
      </section>

      <section className="cart">
        <h2>Cart ({cart.length})</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((product, index) => (
                <li key={`${product.id}-${index}`}>
                  {product.name} <span>₹{product.price}</span>
                </li>
              ))}
            </ul>
            <h3>Total: ₹{total}</h3>
          </>
        )} 
      </section>
    </main>
  )
}



export default App

