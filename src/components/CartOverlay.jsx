import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

class CartOverlay extends React.Component {
  render() {
    return (
      <div className="cart-overlay">
        <div className="cart-overlay__items-container">
          <div className="cart-overlay__header">
            <h3>My Bag,</h3>
            <span>3 items</span>
          </div>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <div className="cart-overlay__summary">
            <div className="cart-overlay__summary__total">
              <h3>Total</h3>
              <span>$200.00</span>
            </div>
            <div className="cart-overlay__summary__buttons">
              <Link to="/cart">
                <button className="cart-overlay__summary__view-bag">
                  View bag
                </button>
              </Link>
              <button className="cart-overlay__summary__checkout">
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
