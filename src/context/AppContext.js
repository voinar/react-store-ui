import React, { Component } from "react";
import axios from "axios";

const AppContext = React.createContext();

export class AppProvider extends Component {
  state = {
    cartOverlayVisibility: false,
    modalOverlayMaskVisibility: false,
    currency: "usd",
    loading: true,
    data: {}
  };

  logPrompt = () => {
    console.log("context loaded");
  };

  getProducts = async () => {
    try {
      const query = await axios({
        url: "http://localhost:4000/",
        method: "POST",
        data: {
          query: `
          query GET_PRODUCTS {
            categories {
              name
              products {
                id
                name
                inStock
                gallery
                description
                category
                attributes {
                  type
                  name
                  id
                  items {
                    id
                    value
                    displayValue
                  }
                }
                brand
                prices {
                  amount
                  currency {
                    label
                    symbol
                  }
                }
              }
            }
          }
          `,
        },
      }).then((result) => {
        console.log(result.data.data);
        this.setState({
          loading: false,
          data: result.data.data,
        });
      });
    } catch (err) {
      console.log(err);
    }
    // console.log('fetch successful')
    // console.log(this.props.category.indexOf(this.props.category))
  };


  render() {
    const { cartOverlayVisibility, modalOverlayMaskVisibility, currency, loading, data } =
      this.state;
      const { logPrompt, getProducts } = this
    return (
      <AppContext.Provider
        value={{
          cartOverlayVisibility,
          modalOverlayMaskVisibility,
          currency,
          loading,
          data,
          logPrompt,
          getProducts
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;
