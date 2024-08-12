  
import { FaCartShopping } from "react-icons/fa6";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Card.module.scss";

const Card = ({ product, setCart, setAdd }) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(cartCount + 1);
    setCart((prevCart) => [...prevCart, product]);
    setAdd((prevAdd) => prevAdd + 1);
    console.log("Added product:", product);
  };

  return (
    <div>
      <img src={product.image_url} alt={product.product_name} />
      <h4>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h4>
      <p>{product.description}</p>

      <div className={styles.colors}>
        {product.color_options.map((color, index) => (
          <div
            key={index}
            style={{ background: color }}
            className={styles.color}
          />
        ))}
      </div>
      <div>${product.price}</div>
      <div className={styles.basic}>
        <Button onClick={addToCart}>
          <FaCartShopping />
          {cartCount > 0 && <span className={styles.just}>{cartCount}</span>}
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Card;

