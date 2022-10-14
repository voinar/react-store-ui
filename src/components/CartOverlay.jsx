import React from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

class CartOverlay extends React.Component {
  static contextType = AppContext;

  outsideRef = React.createRef();

  handleClickOutside = (e) => {
    //handle click outside overlay container
    if (!this.outsideRef.current.contains(e.target)) {
      this.context.contextReducer(this.state, {
        type: 'TOGGLE_CART_OVERLAY',
      });
    }
  };

  toggleCartOverlay = () => {
    this.context.contextReducer(this.state, {
      type: 'TOGGLE_CART_OVERLAY',
    });
  };

  cartCount = (count) => {
    count = this.context.getCartItemsCount();

    switch (count) {
      case 0:
        console.log(count);
        return <>empty</>;
      case 1:
        console.log(count);
        return <>{this.context.getCartItemsCount()} item</>;
      default:
        return <>{this.context.getCartItemsCount()} items</>;
    }
  };

  render() {
    return (
      <div ref={this.outsideRef}>
        <div className="cart-overlay">
          <div className="cart-overlay__items-container">
            <div className="cart-overlay__header">
              <h3>My Bag,</h3>
              <span>{this.cartCount()}</span>
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
                    onClick={this.toggleCartOverlay}
                  >
                    View bag
                  </button>
                </Link>
                <Link to="/cart">
                  <button
                    className="cart-overlay__summary__checkout"
                    onClick={this.toggleCartOverlay}
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
