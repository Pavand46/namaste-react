import { useSelector, useDispatch } from "react-redux";
import { addItem, clearCart } from "../utils/cartSlice";
import Error from "./Error"; // ✅ Import your Error component
import { useState } from "react";

const Cart = () => {
  const [hasError, setHasError] = useState(false);

  try {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    const handleAddItems = (item) => {
      dispatch(addItem(item));
    };

    const handleclearCart = () => {
      dispatch(clearCart());
    };

    return (
      <div className="cart-container">
        <h2 className="cart-header">Your Cart ({cartItems.length} items)</h2>
        {cartItems.length !== 0 && (
          <button className="clear-cart-btn" onClick={handleclearCart}>
            Clear Cart
          </button>
        )}
        {cartItems.length === 0 && (
          <h2 className="cart-header">
            Your Cart Is Empty, Please Add Items to Your cart
          </h2>
        )}
        <ul className="menu-list">
          {cartItems.map((item) => (
            <li key={item.id} className="menu-item">
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p className="price">
                  ₹
                  {Math.floor(item.price / 100) ||
                    Math.floor(item.defaultPrice / 100)}
                </p>
              </div>
              <div className="item-image-container">
                <img
                  className="item-image"
                  alt={item.name}
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1000,h_1000,c_fit/${item.imageId}`}
                />
                <button
                  onClick={() => handleAddItems(item)}
                  className="item-button"
                >
                  Add +
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    // console.error("Cart component crashed:", error);
    setHasError(true);
  }

  if (hasError) {
    return <Error />;
  }
};

export default Cart;
