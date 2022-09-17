import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import AppContext from '../context/AppContext';

class CartOverlay extends React.Component {
  static contextType = AppContext;

  outsideRef = React.createRef();

  handleClickOutside = (e) => {
    if (!this.outsideRef.current.contains(e.target)) {
      this.context.toggleCartOverlay();
    }
  };

  render() {
    return (
      <div className="cart-overlay">
        <div className="cart-overlay__items-container" ref={this.outsideRef}>
          <div className="cart-overlay__header">
            <h3>My Bag,</h3>
            <span>{this.context.productCartItemsCount} items</span>
          </div>
          {this.context.productCartContents.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.cartItemId}
                id={cartItem.cartItemId}
                // cartItemId={cartItem.cartItemId}
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
                  onClick={this.context.toggleCartOverlay}
                >
                  View bag
                </button>
              </Link>
              <button
                className="cart-overlay__summary__checkout"
                onClick={this.context.toggleCartOverlay}
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
    // this.context.getCartItemsCount();
    // this.context.getCartTotal();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
}

export default CartOverlay;
