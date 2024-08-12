import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Products.module.scss";

const baseURL = import.meta.env.VITE_BASE_URL;

const Product = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(() => {
    // Avval localStorage'dan product ma'lumotini o'qib olamiz
    const savedProduct = localStorage.getItem(`product-${productId}`);
    return savedProduct ? JSON.parse(savedProduct) : null;
  });

  useEffect(() => {
    async function fetchProductById() {
      try {
        const response = await fetch(`${baseURL}/products/${productId}`);
        const data = await response.json();
        setProduct(data);

        // Product ma'lumotini localStorage'ga saqlab qo'yamiz
        localStorage.setItem(`product-${productId}`, JSON.stringify(data));
      } catch (error) {
        console.error("Mahsulotni yuklashda xatolik:", error);
      }
    }

    // Faqat product localStorage'da mavjud bo'lmaganda yangi ma'lumot yuklanadi
    if (!product) {
      fetchProductById();
    }
  }, [productId]); // Faqat productId ni dependencies array'iga qo'shamiz

  return (
    <div className={styles.product}>
      {product && (
        <>
          <h2>{product.name}</h2>
          <img
            src={product.image_url}
            alt={product.name}
            className={styles.productImage}
          />
          <p>{product.description}</p>
          <p className={styles.price}>Narxi: ${product.price}</p>
          <p className={styles.brand}>Brend: {product.brand_name}</p>
          <div className={styles.productDetails}>
            {/* Kerak bo'lsa qo'shimcha mahsulot tafsilotlarini qo'shing */}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
