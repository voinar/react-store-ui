import React from "react";
import { Link } from "react-router-dom";
import ProductCategories from "./ProductCategories";
import CurrencySelect from "./CurrencySelect";
import CartOverlay from "../components/CartOverlay";
import ModalOverlayMask from "./ModalOverlayMask";

import Logo from "../../src/assets/icon_logo.svg";
import IconCart from "../../src/assets/icon_empty-cart.svg";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartOverlayVisibility: false,
      modalOverlayMaskVisibility: false,
      currency: "usd",
    };
    this.toggleCartOverlay = this.toggleCartOverlay.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  toggleCartOverlay() {
    this.setState({
      cartOverlayVisibility: !this.state.cartOverlayVisibility,
    });
    this.setState({
      modalOverlayMaskVisibility: !this.state.modalOverlayMaskVisibility,
    });
    console.log(this.state);
  }

  handleCurrencyChange(e) {
    this.setState({ currency: e.target.value });
  }
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
          {this.state.modalOverlayMaskVisibility && (
            <ModalOverlayMask toggleCartOverlay={this.toggleCartOverlay} />
          )}
          <ProductCategories loadProducts={this.props.loadProducts}/>

          <Link to="/">
            <div className="nav-logo">
              <img src={Logo} alt="site logo" />
            </div>
          </Link>
          <ul className="navbar-actions">
            <li>
              <CurrencySelect
                currency={this.state.currency}
                handleCurrencyChange={this.handleCurrencyChange}
              />
            </li>
            <li>
              <img
                className="nav-cart-icon"
                src={IconCart}
                alt="view cart"
                onClick={this.toggleCartOverlay}
              />
              <div className="nav-cart-icon__item-count">3</div>
              {this.state.cartOverlayVisibility && <CartOverlay />}
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default Navbar;
