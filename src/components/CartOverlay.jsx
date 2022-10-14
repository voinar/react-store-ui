import React from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

class CartOverlay extends React.Component {
  static contextType = AppContext;

  outsideRef = React.createRef();

  handleClickOutside = (e) => { //handle click outside overlay container
    if (!this.outsideRef.current.contains(e.target)) {
      this.context.contextReducer(this.state, {
        type: 'TOGGLE_CART_OVERLAY',
      });
    }
  };

  render() {
    return (
      <div ref={this.outsideRef}>
        <div className="cart-overlay">
          <div className="cart-overlay__items-container">
            <div className="cart-overlay__header">
              <h3>My Bag,</h3>
              <span>
                {this.context.getCartItemsCount()}{' '}
                {this.context.getCartItemsCount() === 1 ? 'item' : 'items'}
              </span>
            </div>
            {this.context.productCartContents.map((cartItem) => {
              return (
                <CartItem
                  key={cartItem.cartItemId}
                  id={cartItem.cartItemId}
                  cartItemId={cartItem.cartItemId}
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
                <Link to="/cart">
                  <button
                    className="cart-overlay__summary__checkout"
                    onClick={this.context.toggleCartOverlay}
                  >
                    Check out
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
}

export default CartOverlay;
