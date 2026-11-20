
function Cart({ cart, setCart, onBack }) {

  function increaseQuantity(id) {

    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
  }

  function decreaseQuantity(id) {

    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  }

  function removeItem(id) {

    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">

      <button onClick={onBack}>Continue Shopping</button>

      <h2>My Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (

        cart.map((item) => (

          <div className="cart-item" key={item.id}>

            <img src={item.thumbnail} alt={item.title} />

            <div>
              <h3>{item.title}</h3>

              <p>Price: ${item.price}</p>

              <button onClick={() => decreaseQuantity(item.id)}>
                -
              </button>

              <span> {item.quantity} </span>

              <button onClick={() => increaseQuantity(item.id)}>
                +
              </button>

              <button onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>

          </div>

        ))

      )}

      <h3>Total: ${total.toFixed(2)}</h3>

    </div>
  );
}

export default Cart;
