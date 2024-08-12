import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../store/productsSlice";

const baseURL = import.meta.env.VITE_BASE_URL;

const Products = ({ cart, setCart, setAdd }) => {
  const products = useSelector((store) => store.productsReducer.products);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState(() => {
    const savedBrands = localStorage.getItem("brands");
    return savedBrands ? JSON.parse(savedBrands) : [];
  });
  const [selectedBrand, setSelectedBrand] = useState("");

  const [colors, setColors] = useState(() => {
    const savedColors = localStorage.getItem("colors");
    return savedColors ? JSON.parse(savedColors) : [];
  });
  const [selectedColor, setSelectedColor] = useState("");

  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await fetch(`${baseURL}/brands`);
        const data = await response.json();
        setBrands(data);
        localStorage.setItem("brands", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    }

    async function fetchColors() {
      try {
        const response = await fetch(`${baseURL}/colors`);
        const data = await response.json();
        setColors(data);
        localStorage.setItem("colors", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    }

    // Ma'lumotlar oldindan localStorage'da mavjud bo'lmasa, yuklaymiz
    if (!brands.length) fetchBrands();
    if (!colors.length) fetchColors();
  }, [brands.length, colors.length]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      let query = `${baseURL}/products`;

      const params = [];
      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(query);
        const data = await response.json();

        if (sortOrder === "qimmot") {
          data.sort((a, b) => b.price - a.price);
        } else if (sortOrder === "arzon") {
          data.sort((a, b) => a.price - b.price);
        }

        dispatch(addProducts(data));
        localStorage.setItem("products", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedBrand, selectedColor, sortOrder, dispatch]);

  return (
    <div className={styles.container}>
      <aside>
        <div>
          <h3>BRAND</h3>
          <ul>
            {brands.map((brand, index) => (
              <li key={index}>
                <input
                  type="radio"
                  value={brand}
                  name="brand"
                  id={brand}
                  checked={brand === selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                />
                <label htmlFor={brand}>{brand}</label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>COLORS</h3>
          <ul className={styles.colorsContainer}>
            {colors.map((color, index) => (
              <li key={index}>
                <div
                  style={{
                    background: color,
                    outline: selectedColor === color ? "3px solid red" : "",
                  }}
                  className={styles.color}
                  onClick={() => setSelectedColor(color)}
                />
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main>
        <header className={styles.header}>
          <select
            className={styles.select}
            name="price"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="arzon">Low to High</option>
            <option value="qimmot">High to Low</option>
          </select>
        </header>
        {loading ? (
          <p>Loading...</p>
        ) : products.length ? (
          <div className={styles.grid}>
            {products.map((product) => (
              <Card
                key={product.id}
                product={product}
                cart={cart}
                setCart={setCart}
                setAdd={setAdd}
              />
            ))}
          </div>
        ) : (
          <p>No products</p>
        )}
      </main>
    </div>
  );
};

export default Products;
