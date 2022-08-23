import React from "react";
import AppContext, { AppProvider } from "../context/AppContext";
import axios from "axios";
import { GET_CURRENCIES } from "../graphql/Queries";

import ChevronDown from "../../src/assets/icon_chevron-down.svg";

class CurrencySelect extends React.Component {
  static contextType = AppContext;

  // state = {
  //   currency: "usd",
  //   currencies: [],
  // };

  // getCurrencies = async () => {
  //   try {
  //     const query = await axios(GET_CURRENCIES).then((result) => {
  //       this.setState({
  //         currencies: result.data.data.currencies,
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   console.log(
  //     "currencies fetch successful" + JSON.stringify(this.state.currencies)
  //   );
  // };

  render() {
    return (
      <div className="currency-select">
        <button className="currency-select__dropdown">
          <span>{this.context.currency}</span>
          <img src={ChevronDown} alt="select currency" />
        </button>
        <select
          className="currency-select__dropdown-content"
          size={this.context.currencies.length}
          // onClick={this.context.handleCurrencyChange}
        >
          {/* <option value={this.props.currency.code}>$ USD</option> */}
          {this.context.currencies.map((currency) => {
            return (
              <option key={currency.symbol} value={currency.symbol} onClick={this.context.handleCurrencyChange}>
                {currency.symbol} {currency.label}
              </option>
            );
          })}

          {/* <option value="usd">$ USD</option>
          <option value="eur">€ EUR</option>
          <option value="jpy">¥ JPY</option> */}
        </select>
      </div>
    );
  }

  componentDidMount() {
    this.context.getCurrencies();
  }
}

export default CurrencySelect;
