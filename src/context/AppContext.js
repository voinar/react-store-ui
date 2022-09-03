import React, { Component } from "react";
import axios from "axios";
import { GET_PRODUCT_DETAILS } from "../graphql/Queries";

import {
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCTS,
  GET_CURRENCIES,
} from "../graphql/Queries";

const AppContext = React.createContext();

export class AppProvider extends Component {
  static contextType = AppContext;

  state = {
    loading: true,
    productCategories: [],
    productCategoryIndex: 0,
    loadingProductDescription: true,
    product: null,
    expandImagePreviewIndex: 0,

    cartOverlayVisibility: false,
    modalOverlayMaskVisibility: false,
    currencies: [],
    currency: "$",
    productsDataLoading: true,

    productDescription: null,

    productCartContents: [
      // template for product details, shape of data equal to full product query shown in product description page
      {
        id: "huarache-x-stussy-le",
        name: null,
        inStock: null,
        gallery: null,
        brand: null,
        prices: {
          amount: null,
          currency: {
            label: null,
            symbol: null,
          },
          attributes: {
            type: null,
            items: {
              id: null,
              value: null,
              displayValue: null,
            },
            name: null,
            id: null,
          },
          description: null,
          category: null,
        },
        quantity: 0,
      },

      // {productId:"xbox-series-s",otherValues:null}
    ],
  };

  getCategories = async () => {
    try {
      const query = await axios({
        url: "http://localhost:4000",
        method: "POST",
        data: {
          query: `
          query GET_CATEGORIES {
            categories {
              name
            }
          }
          `,
        },
      }).then((result) => {
        this.setState({
          loading: false,
          productCategories: result.data.data,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  logPrompt = () => {
    console.log("context loaded");
  };

  toggleCartOverlay = () => {
    this.setState({
      cartOverlayVisibility: !this.state.cartOverlayVisibility,
    });
    this.setState({
      modalOverlayMaskVisibility: !this.state.modalOverlayMaskVisibility,
    });
    // console.log("clicked");
  };

  getProductCategories = async () => {
    try {
      const query = await axios(GET_PRODUCT_CATEGORIES).then((result) => {
        this.setState({
          loading: false,
          productCategories: result.data.data,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  loadProductCategory = (e) => {
    const productCategoryIndex = this.state.productCategories.categories
      .map((category) => category.name)
      .indexOf(e.target.textContent);
    // .indexOf((window.location.pathname).substring(1));
    this.setState({ productCategoryIndex: productCategoryIndex });
    // console.log(
    //   "load category" + e.target.textContent + this.state.productCategoryIndex
    // );
  };

  getProducts = async () => {
    try {
      const query = await axios(GET_PRODUCTS).then((result) => {
        this.setState({
          productsDataLoading: false,
          productsData: result.data.data,
        });
      });
    } catch (err) {
      console.log(err);
    }
    // console.log("products fetch successful");
  };

  getProductDescription = async () => {
    const productId = window.location.pathname.substring(9);
    try {
      const getProductDetails = await axios(
        GET_PRODUCT_DETAILS(productId)
      ).then((response) => {
        this.setState({
          loadingProductDescription: false,
          productDescription: response.data.data,
        });
      });
    } catch (err) {
      console.log(err);
    }

    console.log("getProductDescription: " + JSON.stringify(this.state.product));
    console.log(
      "loadingProductDescription: " +
        JSON.stringify(this.state.loadingProductDescription)
    );
  };

  getCurrencies = async () => {
    try {
      const query = await axios(GET_CURRENCIES).then((result) => {
        this.setState({
          currencies: result.data.data.currencies,
        });
      });
    } catch (err) {
      console.log(err);
    }
    // console.log(
    //   "currencies fetch successful" + JSON.stringify(this.state.currencies)
    // );
  };

  handleCurrencyChange = (e) => {
    this.setState({ currency: e.target.value });
    console.log("handle curency change: " + this.state.currency);
  };

  addToCart = () => {
    const productId = window.location.pathname.substring(9);
    console.log("product added to cart: " + productId);
    this.setState({
      productCartContents: [
        ...this.state.productCartContents,
        {
          id: productId,
          name: null,
          inStock: null,
          gallery: null,
          brand: null,
          prices: {
            amount: null,
            currency: {
              label: null,
              symbol: null,
            },
            attributes: {
              type: null,
              items: {
                id: null,
                value: null,
                displayValue: null,
              },
              name: null,
              id: null,
            },
            description: null,
            category: null,
          },
          quantity: 1,
        },
      ],
    });
    console.log(
      "product added: " + JSON.stringify(this.state.productCartContents)
    );
    console.log(
      "cart array length: " +
        JSON.stringify(this.state.productCartContents.length)
    );
    console.log("current state: " + JSON.stringify(this.state));

    // this.setState({...this.state.productCartContents.productId.push(window.location.pathname.substring(9))})

    // this.setState({productId: productId})
    // console.log(this.state.productCartContents)
  };

  render() {
    const {
      loading,
      productCategories,
      productCategoryIndex,
      expandImagePreviewIndex,
      cartOverlayVisibility,
      modalOverlayMaskVisibility,
      currencies,
      currency,
      productsDataLoading,
      productsData,
      productDescription,
      productCartContents,
    } = this.state;
    const {
      getCategories,
      logPrompt,
      toggleCartOverlay,
      getProductCategories,
      loadProductCategory,
      getProducts,
      getProductDescription,
      getCurrencies,
      handleCurrencyChange,
      addToCart,
    } = this;
    return (
      <AppContext.Provider
        value={{
          loading,
          productCategories,
          productCategoryIndex,
          expandImagePreviewIndex,
          cartOverlayVisibility,
          modalOverlayMaskVisibility,
          currencies,
          currency,
          productsDataLoading,
          productsData,
          productDescription,
          productCartContents,
          getCategories,
          logPrompt,
          toggleCartOverlay,
          getProductCategories,
          loadProductCategory,
          getProducts,
          getProductDescription,
          getCurrencies,
          handleCurrencyChange,
          addToCart,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;
