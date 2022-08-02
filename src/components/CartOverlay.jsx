import React from "react";
import CartItem from "./CartItem";


class CartOverlay extends React.Component {
    render() {
    return <div className="cart-overlay">
        <div className="cart-overlay__items-container">
            <div className="cart-overlay__header">
                <h3>My Bag,</h3>
                <span>3 items</span>
            </div>
            <CartItem />
            <div className="cart-overlay__summary">
                <div className="cart-overlay__summary__total">
                    <h3>Total</h3>
                    <span>$200.00</span>
                </div>
                <div className="cart-overlay__summary__buttons">
                    <button className="cart-overlay__summary__view-bag">View bag</button>
                    <button className="cart-overlay__summary__checkout">Check out</button>
                </div>
            </div>
        </div>
    </div>
    }
}

export default CartOverlay;