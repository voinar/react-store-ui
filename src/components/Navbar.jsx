import React from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';

import ModalOverlayMask from './ModalOverlayMask';
import ProductCategories from './ProductCategories';
import CurrencySelect from './CurrencySelect';
import CartOverlay from '../components/CartOverlay';
import ProductCartItemsCount from './CartItemsCount';

import Logo from '../../src/assets/icon_logo.svg';
import IconCart from '../../src/assets/icon_empty-cart.svg';

class Navbar extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <>
        <nav className="navbar container">
          {this.context.modalOverlayMaskVisibility && <ModalOverlayMask />}

          <ProductCategories />

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

              <ProductCartItemsCount />
              {this.context.cartOverlayVisibility && <CartOverlay />}
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default Navbar;
