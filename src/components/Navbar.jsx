import React from "react";
import { Link } from "react-router-dom";
import ProductCategories from './ProductCategories';
import CurrencySelect from "./CurrencySelect";
import CartOverlay from "../components/CartOverlay";

import Logo from "../../src/assets/icon_logo.svg";
import IconCart from "../../src/assets/icon_empty-cart.svg";


class Navbar extends React.Component {
  render() {
    return (
      <>
        <nav
          className="navbar container"
          onClick={
            this.props.cartOverlayVisibility
              ? this.props.toggleCartOverlay
              : null
          }
        >
        <ProductCategories />

          <Link to="/">
            <div className="nav-logo">
              <img src={Logo} alt="site logo" />
            </div>
          </Link>
          <ul className="navbar-actions">
            <li>
              <CurrencySelect
                currency={this.props.currency}
                handleCurrencyChange={this.props.handleCurrencyChange}
              />
            </li>
            <li>
              <img
                className="nav-cart-icon"
                src={IconCart}
                alt="view cart"
                onClick={this.props.toggleCartOverlay}
              />
              <div className="nav-cart-icon__item-count">3</div>
              {this.props.cartOverlayVisibility && <CartOverlay />}
              {/* <CartOverlay /> */}
            </li>
          </ul>
        </nav>
        {/* {this.props.modalOverlayMaskVisibility && <ModalOverlayMask onClick={this.props.toggleCartOverlay} />} */}
      </>
    );
  }
}

export default Navbar;
