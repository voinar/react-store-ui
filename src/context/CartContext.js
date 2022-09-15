import React, { Component } from 'react';
import axios from 'axios';

// import {
//   GET_PRODUCT_CATEGORIES,
//   GET_PRODUCTS,
//   GET_CURRENCIES,
// } from "../graphql/Queries";

const CartContext = React.createContext();

export class CartProvider extends Component {
  static contextType = CartContext;
  state = {
    productCartContents: [
      {
        productId: null,
        otherValues: null,
      },
    ],
  };

  logPrompt = () => {
    console.log('cart context loaded');
  };

  addToCart = (item) => {
    const productId = window.location.pathname.substring(9);
    // console.log("product id: " + window.location.pathname.substring(9))
    console.log(item);
    // this.setState({...this.state.productCartContents.productId.push(window.location.pathname.substring(9))})

    this.setState({ productId: productId });
    console.log(this.state.productCartContents);
  };

  render() {
    const {} = this.state;
    const { addToCart } = this;
    return (
      <CartContext.Provider
        value={{
          addToCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
