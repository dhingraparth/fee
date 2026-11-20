
function ProductCard({ product, onAddToCart }) {

  return (
    <div className="product-card">

      <img src={product.thumbnail} alt={product.title} />

      <h3>{product.title}</h3>

      <p>Price: ${product.price}</p>

      <p>Rating: ⭐ {product.rating}</p>

      <button onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;
