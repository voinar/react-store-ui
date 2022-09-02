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
    productCategories: {
      categories: [],
    },
    productCategoryIndex: 0,
    loadingProductDescription: true,
    product: null,
    expandImagePreviewIndex: 0,

    cartOverlayVisibility: false,
    modalOverlayMaskVisibility: false,
    currencies: [],
    currency: "$",
    productsDataLoading: true,

    productCartContents: [
      { productId: "huarache-x-stussy-le",
      category: null,
      otherValues: null },
      // {productId:"xbox-series-s",otherValues:null}
    ],
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
    console.log(
      "categories from context" + JSON.stringify(this.state.productCategories)
    );
  };

  loadProductCategory = (e) => {
    const productCategoryIndex = this.state.productCategories.categories
      .map((category) => category.name)
      .indexOf(e.target.textContent);
    // .indexOf((window.location.pathname).substring(1));
    this.setState({ productCategoryIndex: productCategoryIndex });
    console.log(
      "load category" + e.target.textContent + this.state.productCategoryIndex
    );
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
          product: response.data.data,
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
    console.log(
      "currencies fetch successful" + JSON.stringify(this.state.currencies)
    );
  };

  handleCurrencyChange = (e) => {
    this.setState({ currency: e.target.value });
    console.log("handle curency change: " + this.state.currency);
  };

  addToCart = () => {
    const productId = window.location.pathname.substring(9);
    console.log("product clicked: " + productId);
    this.setState({
      productCartContents: [
        ...this.state.productCartContents,
        {
          productId: productId,
          otherValues: null,
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
      cartOverlayVisibility,
      modalOverlayMaskVisibility,
      currencies,
      currency,
      productsDataLoading,
      productsData,
      productCartContents,
    } = this.state;
    const {
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
          cartOverlayVisibility,
          modalOverlayMaskVisibility,
          currencies,
          currency,
          productsDataLoading,
          productsData,
          productCartContents,
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
