import React from 'react';
import AppContext from '../../context/AppContext';
import uuid from 'react-uuid';

import CartItem from '../../components/CartItem';

class Cart extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <div className="cart section-container">
        <div>
          <h1>Cart</h1>
        </div>

        {this.context.productCartContents.map((cartItem) => {
          return (
            <CartItem
              key={uuid()}
              id={cartItem.cartItemId}
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
              <div className="cart__summary__tax__label">
                <span>Tax 21%:</span>
              </div>
              <div>
                <strong>
                  <span>
                    {this.context.currency}
                    {parseFloat(
                      (Number(this.context.cartTotal) * 21) / 100
                    ).toFixed(2)}
                  </span>
                </strong>
              </div>
            </div>
            <div className="cart__summary__quantity">
              <div className="cart__summary__quantity__label">
                <span>Quantity:</span>
              </div>
              <div>
                <strong>
                  <span>{this.context.getCartItemsCount()}</span>
                </strong>
              </div>
            </div>
            <div className="cart__summary__total">
              <div className="cart__summary__total__label"><span>Total</span></div>
              <div>
                <strong>
                  <span>
                    {this.context.currency}
                    {(() => {
                      return Number(
                        parseFloat(this.context.cartTotal) +
                          (parseFloat(this.context.cartTotal) * 21) / 100
                      ).toFixed(2);
                    })()}
                  </span>
                </strong>
              </div>
            </div>
          </div>
          <button
            className="cart__summary__order"
            onClick={() => {
              alert(':)');
            }}
          >
            Order
          </button>
        </div>
      </div>
    );
  }
}

export default Cart;
