import React from 'react';
import AppContext from '../context/AppContext';

class ProductCartItemsCount extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      this.context.getCartItemsCount() === 0 ? null :
      <div
        className="navbar-cart-icon__item-count"
        onClick={this.context.toggleCartOverlay}
      >
        {this.context.getCartItemsCount()}
      </div>
    );
  }
}

export default ProductCartItemsCount;
