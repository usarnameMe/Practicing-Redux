import React from "react";
import productList from "../data/productList.json";
import "../styles/home.scss";
import cartSlice from "../data/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { cartProductIds } = useSelector((state) => state.cart);
  const { addToCart, removeFromCart } = cartSlice.actions;
  const dispatch = useDispatch();

  const featuredProduct = productList.products[0];
  const otherProducts = productList.products.slice(1);

  return (
    <div className="container product-catalogue">
      <div className="featured-section">
        <div className="featured-image">
          <img src={featuredProduct.imageUrl} alt={featuredProduct.name} />
        </div>
        <div className="featured-details">
          <h2>Masterpieces Collection: Timeless Art for Every Home</h2>
          <p>
            Dive into an exquisite collection of timeless art. From the
            mesmerizing swirls of Van Gogh to the enigmatic smile of Mona Lisa,
            adorn your space with pieces that have enchanted audiences for
            centuries.
          </p>
        </div>
      </div>

      <div className="product-grid">
        {otherProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!cartProductIds.includes(product.id)) {
                  dispatch(addToCart(product.id));
                } else {
                  dispatch(removeFromCart(product.id));
                }
              }}
            >
              {!cartProductIds.includes(product.id)
                ? "Add to Cart"
                : "Remove from Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
