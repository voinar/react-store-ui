import React from "react";

import CartItem from "../../components/CartItem";

class Cart extends React.Component {
  render() {
    return (
      <div className="cart section-container">
        <div>
          <h1>Cart</h1>
        </div>
        <CartItem />
        <CartItem />
        <hr/>
        <div className="cart__summary">
          <table>
            <tr className="cart__summary__tax">
              <td>Tax 21%:</td>
              <td><strong>$42.00</strong></td>
            </tr>
            <tr className="cart__summary__quantity">
              <td>Quantity:</td>
              <td><strong>3</strong></td>
            </tr>
            <tr className="cart__summary__total">
              <td>Total:</td>
              <td><strong>$200.00</strong></td>
            </tr>
          </table>
          <button className="cart__summary__order">Order</button>
        </div>
      </div>
    );
  }
}

export default Cart;
