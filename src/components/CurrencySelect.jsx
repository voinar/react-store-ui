import React from "react";

import ChevronDown from "../../src/assets/icon_chevron-down.svg";

class CurrencySelect extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="currency-select">
        <button className="currency-select__dropdown">
          <span>{this.props.currency}</span>
          <img src={ChevronDown} alt="select currency" />
        </button>
        {/* <div className="currency-select__dropdown-content">
            <span>$ USD</span>
            <span>€ EUR</span>
            <span>¥ JPY</span>
          </div> */}
        <select
          className="currency-select__dropdown-content"
          size={this.props.currency.length}
          // currency={this.props.currency}
          onClick={this.props.handleCurrencyChange}
          // value={this.state.currency}
          >
          {/* <option value={this.props.currency.code}>$ USD</option> */}
          <option value="usd">$ USD</option>
          <option value="eur">€ EUR</option>
          <option value="jpy">¥ JPY</option>
        </select>
      </div>
    );
  }
}

export default CurrencySelect;
