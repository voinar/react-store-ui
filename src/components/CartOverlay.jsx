import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import AppContext, { AppProvider } from "../context/AppContext";
import uuid from 'react-uuid';

class CartOverlay extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <div className="cart-overlay">
        <div className="cart-overlay__items-container">
          <div className="cart-overlay__header">
            <h3>My Bag,</h3>
            <span>{this.context.productCartContents.length} items</span>
          </div>
          {this.context.productCartContents.map((cartItem) => {
            return (
              <CartItem
              key={uuid()}
              productId={cartItem.productId}
              />
            );
          })}
          {/* <CartItem />
          <CartItem />
          <CartItem />
          <CartItem /> */}
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
