import React from "react";
import AppContext, { AppProvider } from "../../context/AppContext";
import uuid from "react-uuid";

import CartItem from "../../components/CartItem";

class Cart extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <div className="cart section-container">
        <div>
          <h1>Cart</h1>
        </div>
        {/*
        {this.context.productCartContents === undefined
          ? (<>TRUE</>) : (<>FALSE</>)
        } */}
        {this.context.productCartContents.map((cartItem) => {
          return (
            <CartItem
              key={uuid()}
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

        <hr />
        <div className="cart__summary">
          <div>
            <div className="cart__summary__tax">
              <div>Tax 21%:</div>
              <div>
                <strong>$42.00</strong>
              </div>
            </div>
            <div className="cart__summary__quantity">
              <div>Quantity:</div>
              <div>
                <strong>{this.context.productCartItemsCount}</strong>
              </div>
            </div>
            <div className="cart__summary__total">
              <div>Total:</div>
              <div>
                <strong>
                  {this.context.currency}
                  {this.context.cartTotal}
                </strong>
              </div>
            </div>
          </div>
          <button className="cart__summary__order">Order</button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    // {()=>this.context.currencies === [] ? this.context.getCurrencies() : null}; //load currencies from API
    // {console.log('currencies context '+ JSON.stringify(this.context.currencies))}; //load currencies from API
  }
}

export default Cart;
