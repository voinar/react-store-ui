import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import AppContext from "../context/AppContext";

class CartOverlay extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <div className="cart-overlay" ref={this.outsideRef}>
        <div className="cart-overlay__items-container">
          <div className="cart-overlay__header">
            <h3>My Bag,</h3>
            <span>{this.context.productCartItemsCount} items</span>
          </div>
          {
            this.context.productCartContents
          .map((cartItem) => {
            return (
              <CartItem
                key={cartItem.cartItemId}
                productId={cartItem.id} //id used to query graphql for product details
                productDetails={cartItem}
                attributeSelectedColor={
                  cartItem.attributesSelected.attributeSelectedColor
                }
                attributeSelectedSize={
                  cartItem.attributesSelected.attributeSelectedSize
                }
                attributeSelectedCapacity={
                  cartItem.attributesSelected.attributeSelectedCapacity
                }
              />
            );
          })}

          <div className="cart-overlay__summary">
            <div className="cart-overlay__summary__total">
              <h3>Total</h3>
              <span>
                {this.context.currency}
                {this.context.cartTotal}
              </span>
            </div>
            <div className="cart-overlay__summary__buttons">
              <Link to="/cart">
                <button
                  className="cart-overlay__summary__view-bag"
                  onClick={this.context.toggleModalOverlayMask}
                >
                  View bag
                </button>
              </Link>
              <button
                className="cart-overlay__summary__checkout"
                onClick={this.context.toggleModalOverlayMask}
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.context.getProductCartItemsCount();
    this.context.getCartTotal();
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  outsideRef = React.createRef();

  handleClickOutside = (e) => {
    if (!this.outsideRef.current.contains(e.target)) {
      this.context.toggleModalOverlayMask();
    }
  };
}

export default CartOverlay;
