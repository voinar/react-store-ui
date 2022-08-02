import React from "react";

import ChevronDown from "../../src/assets/icon_chevron-down.svg";

class CurrencySelect extends React.Component {
  render() {
    return (
      <div className="currency-select">
          <button class="currency-select__dropdown">
            <span>$</span><img src={ChevronDown} />
          </button>
          <div class="currency-select__dropdown-content">
            <span>$ USD</span>
            <span>€ EUR</span>
            <span>¥ JPY</span>
          </div>
      </div>
    );
  }
}

export default CurrencySelect;
