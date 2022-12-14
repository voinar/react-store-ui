import React from 'react';
import AppContext from '../context/AppContext';
import LoadingSpinner from './LoadingSpinner';

import ChevronDown from '../../src/assets/icon_chevron-down.svg';

class CurrencySelect extends React.Component {
  static contextType = AppContext;

  outsideRef = React.createRef(); //ref for handling of click events outside of currency overlay
  state = { currencySelectVisibility: false }; //currency overlay visibility

  toggleCurrencySelect = () => {
    this.setState((prevState) => {
      return {
        currencySelectVisibility: !prevState.currencySelectVisibility,
      };
    });
  };

  handleClickOutside = (e) => {
    if (
      this.state.currencySelectVisibility === true &&
      !this.outsideRef.current.contains(e.target)
    ) {
      this.toggleCurrencySelect();
    }
  };

  render() {
    const { currencies } = this.context;
    const { currency } = this.context;

    return (
      <>
        {currency === '' ? (
          <>
            <LoadingSpinner />
          </>
        ) : (
          <div className="currency-select">
            <button
              className="currency-select__dropdown"
              onClick={this.toggleCurrencySelect}
            >
              <span>{currency}</span>
              <img src={ChevronDown} alt="select currency" />
            </button>
            {this.state.currencySelectVisibility === true ? (
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
                        this.toggleCurrencySelect();
                        this.context.contextReducer(this.state, {
                          type: 'HANDLE_CURRENCY_CHANGE',
                          payload: e,
                        });
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
    //load currencies to state on mount
    this.context.contextReducer(this.state, {
      type: 'GET_CURRENCIES',
    });
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
}

export default CurrencySelect;
