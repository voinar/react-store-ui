import React from "react";
import CurrencySelect from "./CurrencySelect";

import Logo from "../../src/assets/icon_logo.svg";
import ChevronDown from "../../src/assets/icon_chevron-down.svg";
import IconCart from "../../src/assets/icon_empty-cart.svg";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar container">
        <ul className="navbar-categories">
          <li>Women</li>
          <li>Men</li>
          <li>Kids</li>
        </ul>
        <div className="nav-logo">
          <img src={Logo} alt="site logo" />
        </div>

        <ul className="navbar-actions">
          <li>
            <CurrencySelect />
          </li>
          {/* <li className="currency-select">
            <span>$</span>
            <img src={ChevronDown} />
          </li> */}
          <li>
            <img src={IconCart} alt="view cart" />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
