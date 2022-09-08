import React from "react";
import AppContext, { AppProvider } from "../context/AppContext";
import axios from "axios";
import { GET_CURRENCIES } from "../graphql/Queries";

import ChevronDown from "../../src/assets/icon_chevron-down.svg";

class CurrencySelect extends React.Component {
  static contextType = AppContext;

  render() {
    const { currencies } = this.context;
    const { currency } = this.context;

    return (
      <>
        { currency === '' ? (<>loading...</>) : (
          <div className="currency-select">
            <button className="currency-select__dropdown">
              <span>
                {currency}
              </span>
              <img src={ChevronDown} alt="select currency" />
            </button>
            <select
              className="currency-select__dropdown-content"
              size={currencies.length}
              // onClick={this.context.handleCurrencyChange}
            >
              {/* <option value={this.props.currency.code}>$ USD</option> */}
              {currencies.map((currency) => {
                return (
                  <option
                    key={currency.symbol}
                    value={currency.symbol}
                    onClick={this.context.handleCurrencyChange}
                  >
                    {currency.symbol} {currency.label}
                  </option>
                );
              })}
            </select>
          </div>
        )

        }
      </>
    );
  }

  componentDidMount() {
    this.context.getCurrencies(); //load currencies from API
  }
}

export default CurrencySelect;
