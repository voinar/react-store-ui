import React from "react";
import { Link } from "react-router-dom";
import ProductCategories from "./ProductCategories";
import CurrencySelect from "./CurrencySelect";
import CartOverlay from "../components/CartOverlay";
import ModalOverlayMask from "./ModalOverlayMask";

import Logo from "../../src/assets/icon_logo.svg";
import IconCart from "../../src/assets/icon_empty-cart.svg";

import AppContext, { AppProvider } from "../context/AppContext";


class Navbar extends React.Component {
  static contextType = AppContext

  // constructor(props) {
  //   super(props);
  //   // this.toggleCartOverlay = this.toggleCartOverlay.bind(this);
  //   // this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  // }

  // state = {
  //   currency: "usd",
  // };


  render() {
    // console.log('state: ' + JSON.stringify(this.state));
    // console.log('context: ' + JSON.stringify(this.context));
    return (
      <>
        <nav
          className="navbar container"
          onClick={
            this.context.cartOverlayVisibility
              ? this.context.toggleCartOverlay
              : null
          }
        >
          {this.context.modalOverlayMaskVisibility && (
            <ModalOverlayMask toggleCartOverlay={this.context.toggleCartOverlay} />
          )}

          <ProductCategories
            // loadProducts={this.props.loadProducts}
            // categories={this.context.categories}
            // loading={this.context.loading}
          />

          <Link to="/">
            <div className="navbar-logo">
              <img src={Logo} alt="site logo" />
            </div>
          </Link>

          <ul className="navbar-actions">
            <li>
              <CurrencySelect />
            </li>
            <li>
              <img
                className="navbar-cart-icon"
                src={IconCart}
                alt="view cart"
                onClick={this.context.toggleCartOverlay}
              />
              <div className="navbar-cart-icon__item-count">{this.context.productCartContents.length}</div>
              {this.context.cartOverlayVisibility && <CartOverlay />}
            </li>
          </ul>
        </nav>
      </>
    );
  }
}


export default Navbar;
