import React from "react";

import Logo from "../../src/assets/icon_logo.svg";
import ChevronDown from "../../src/assets/icon_chevron-down.svg";
import IconCart from "../../src/assets/icon_empty-cart.svg";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar container">
        <ul>
          <li>Women</li>
          <li>Men</li>
          <li>Kids</li>
        </ul>
        <div className="nav-logo">
          <img src={Logo} alt="site logo" />
        </div>
        <ul className="actions">
          <li className="currency-select">
            <span>
              $<img src={ChevronDown} />
            </span>
          </li>
          <li>
            <img src={IconCart} alt="view cart" />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
