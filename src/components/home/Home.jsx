import React from "react";
import styles from "./home.module.scss";

const Home = ({ cart }) => {
  return (
    <div className={styles["home-container"]}>
      <h3>Your Products:</h3>
      <ul className={styles["product-list"]}>
        {cart.map((item, index) => (
          <li key={index} className={styles["product-item"]}>
            <img
              src={item.image_url}
              alt={item.name}
              className={styles["product-image"]}
            />
            <div>{item.name}</div>
            <div>Brand: {item.brand_name}</div>
            <div>Price: ${item.price}</div>
          </li>
        ))}
        
      </ul>
    </div>
  );
};

export default Home;
