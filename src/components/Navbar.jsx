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

  render() {
    return (
      <>
        <nav
          className="navbar container"
          // onClick={
          //   this.context.cartOverlayVisibility
          //     ? this.context.toggleModalOverlayMask
          //     : null
          // }
        >
          {this.context.modalOverlayMaskVisibility && (
            <ModalOverlayMask />
          )}

          <ProductCategories
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
                onClick={this.context.toggleModalOverlayMask}
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
