import React from 'react';
import AppContext from '../context/AppContext';

import ChevronDown from '../../src/assets/icon_chevron-down.svg';

class CurrencySelect extends React.Component {
  static contextType = AppContext;

  outsideRef = React.createRef();

  handleClickOutside = (e) => {
    if (
      this.context.currencySelectVisibility === true &&
      !this.outsideRef.current.contains(e.target)
    ) {
      this.context.toggleCurrencySelect();
    }
  };

  render() {
    const { currencies } = this.context;
    const { currency } = this.context;

    return (
      <>
        {currency === '' ? (
          <>loading...</>
        ) : (
          <div className="currency-select">
            <button
              className="currency-select__dropdown"
              onClick={this.context.toggleCurrencySelect}
            >
              <span>{currency}</span>
              <img src={ChevronDown} alt="select currency" />
            </button>
            {this.context.currencySelectVisibility === true ? (
              <select
                className="currency-select__dropdown-content"
                size={currencies.length}
                ref={this.outsideRef}
              >
                {currencies.map((currency) => {
                  return (
                    <option
                      key={currency.symbol}
                      value={currency.symbol}
                      onClick={(e) => {
                        this.context.toggleCurrencySelect();
                        this.context.handleCurrencyChange(e);
                      }}
                    >
                      {currency.symbol} {currency.label}
                    </option>
                  );
                })}
              </select>
            ) : null}
          </div>
        )}
      </>
    );
  }

  componentDidMount() {
    this.context.getCurrencies(); //load currencies from API
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
}

export default CurrencySelect;
