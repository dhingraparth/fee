
import { useState, useEffect } from "react";

function ProductDetails({ productId, onBack }) {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true);

    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });

  }, [productId]);

  if (loading) {
    return <h2>Loading product details...</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (

    <div className="product-details">

      <button onClick={onBack}>Back to Products</button>

      <div className="details-content">

        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div>

          <h2>{product.title}</h2>

          <p>{product.description}</p>

          <h3>Price: ${product.price}</h3>

          <p>Discount: {product.discountPercentage}%</p>

          <p>Rating:  {product.rating}</p>

          <p>Brand: {product.brand || "Not available"}</p>

          <p>Category: {product.category}</p>

          <p>Stock: {product.stock}</p>

        </div>

      </div>

    </div>

  );
}

export default ProductDetails;
