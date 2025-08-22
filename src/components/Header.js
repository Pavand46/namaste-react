import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  useEffect(() => {}, [btnName]);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" alt="LOGO" src={LOGO_URL} />
      </div>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link">
              {/* Cart - ({cartItems.length} items) */}
              Cart
            </Link>
          </li>
          <button
            className="login-btn"
            onClick={() => {
              if (btnName === "Login") {
                setBtnName("Logout");
              } else {
                setBtnName("Login");
              }
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
