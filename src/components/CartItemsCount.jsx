import React from 'react';
import AppContext from '../context/AppContext';

class ProductCartItemsCount extends React.Component {
  static contextType = AppContext;

  toggleCartOverlay = () => {
    this.context.contextReducer(this.state, {
      type: 'TOGGLE_CART_OVERLAY',
    });
  };

  render() {
    return (
      this.context.getCartItemsCount() === 0 ? null :
      <div
        className="navbar-cart-icon__item-count"
        onClick={this.toggleCartOverlay}
      >
        {this.context.getCartItemsCount()}
      </div>
    );
  }
}

export default ProductCartItemsCount;
