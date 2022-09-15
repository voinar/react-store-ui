import React from "react";
import AppContext from "../context/AppContext";

class ProductCartItemsCount extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <div className="navbar-cart-icon__item-count">
        {this.context.productCartItemsCount}
      </div>
    );
  }

  componentDidMount() {
    // this.context.getCartItemsCount();
    // () => {this.context.getCartItemsCount()}
  }
}

export default ProductCartItemsCount;
