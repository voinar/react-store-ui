//context api used to manage global state

import React, { Component } from 'react';
import axios from 'axios'; //data fetch library
import uuid from 'react-uuid'; //unique id for product cards and cart items
import initialState from './InitialState'; //default state used for initialization & saved to localStorage or first run

//graphQL queries
import {
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCTS,
  GET_PRODUCT_DETAILS,
  GET_CURRENCIES,
} from '../graphql/Queries';

const AppContext = React.createContext();

export class AppProvider extends Component {
  static contextType = AppContext;

  state = JSON.parse(localStorage.getItem('appState')) ?? initialState; //load state from localStorage or from initialState default

  //state setter functions
  toggleCartOverlay = () => {
    this.setState((prevState) => {
      return {
        cartOverlayVisibility: !prevState.cartOverlayVisibility,
        modalOverlayMaskVisibility: !prevState.modalOverlayMaskVisibility,
      };
    });
  };

  toggleCurrencySelect = () => {
    this.setState((prevState) => {
      return {
        currencySelectVisibility: !prevState.currencySelectVisibility,
      };
    });
  };

  getProductCategories = async () => {
    try {
      await axios(GET_PRODUCT_CATEGORIES).then((result) => {
        this.setState((prevState) => ({
          loading: (prevState.loading = false),
          productCategories: (prevState.productCategories =
            result.data.data.categories),
        }));
      });
    } catch (err) {
      console.log(err);
    }
  };

  loadProductCategory = (e) => {
    const productCategoryIndex = this.state.productCategories
      .map((category) => category.name)
      .indexOf(e.target.textContent);
    this.setState((prevState) => ({
      productCategoryIndex: (prevState.productCategoryIndex =
        productCategoryIndex),
    }));
  };

  getProducts = async () => {
    try {
      await axios(GET_PRODUCTS).then((result) => {
        this.setState((prevState) => ({
          productsDataLoading: (prevState.productsDataLoading = false),
          productsData: (prevState.productsData = result.data.data),
        }));
      });
    } catch (err) {
      console.log(err);
    }
  };

  getProductDescription = async () => {
    this.clearAttributeCache();

    const productId = window.location.pathname.substring(9);
    let newProductDescription = {};

    try {
      await axios(GET_PRODUCT_DETAILS(productId)).then((response) => {
        newProductDescription = response.data.data;
      });
    } catch (err) {
      console.log(err);
    }

    this.setState((prevState) => ({
      loadingProductDescription: (prevState.loadingProductDescription = false),
      productDescription: (prevState.productDescription =
        newProductDescription),
    }));

    this.selectDefaultAttributes();
    this.handleStateUpdate();
    this.forceUpdate();
  };

  getCurrencies = async () => {
    let currencyIndex = () => {
      //if currency in initialState is undefined then pick 0-index as default, else persist selected currency from state in localStorage
      if (this.state.currency === '') {
        return 0;
      } else {
        return this.state.currencies.findIndex(
          (currency) => currency.symbol === this.state.currency
        );
      }
    };

    try {
      await axios(GET_CURRENCIES).then((result) => {
        this.setState((prevState) => ({
          currencies: (prevState.currencies = result.data.data.currencies),
          currency: (prevState.currency =
            result.data.data.currencies[currencyIndex()].symbol),
        }));
      });
    } catch (err) {
      console.log(err);
    }
    this.handleStateUpdate();
  };

  handleCurrencyChange = async (e) => {
    let currencyUpdate = e.target.value;
    await this.setState((prevState) => ({
      currency: (prevState.currency = currencyUpdate),
    }));
    this.handleStateUpdate();
  };

  selectAttributeColor = (e) => {
    //change color attribute in product page
    this.setState((prevState) => ({
      attributeSelectedColor: (prevState.attributeSelectedColor =
        e.target.textContent),
    }));
    this.handleStateUpdate();
  };

  selectAttributeColorById = (e, uuid) => {
    //select item by id
    //change attribute in state
    let newCartContents = [...this.state.productCartContents]; // create copy of state array
    newCartContents[
      this.state.productCartContents.findIndex(
        (cartItem) => cartItem.cartItemId === uuid
      )
    ].attributesSelected.attributeSelectedColor = e.target.textContent; //new value
    this.setState((prevState) => ({
      productCartContents: (prevState.productCartContents = newCartContents),
    })); //update the value
    this.handleStateUpdate();
  };

  selectAttributeSize = (e) => {
    //select size from product description page
    this.setState((prevState) => ({
      attributeSelectedSize: (prevState.attributeSelectedSize =
        e.target.textContent),
    }));
    this.handleStateUpdate();
  };

  selectAttributeSizeById = (e, uuid) => {
    //change attribute in cart: select item by id, then change attribute in state
    let newCartContents = [...this.state.productCartContents]; // create copy of state array
    newCartContents[
      this.state.productCartContents.findIndex(
        (cartItem) => cartItem.cartItemId === uuid
      )
    ].attributesSelected.attributeSelectedSize = e.target.textContent; //new value
    this.setState((prevState) => ({
      productCartContents: (prevState.productCartContents = newCartContents),
    })); //update the value
    this.handleStateUpdate();
  };

  selectAttributeCapacity = (e) => {
    //select attribute from product description page
    this.setState((prevState) => ({
      attributeSelectedCapacity: (prevState.attributeSelectedCapacity =
        e.target.textContent),
    }));
    this.handleStateUpdate();
  };

  selectAttributeCapacityById = (e, uuid) => {
    //change capacity attribute in cart: select item by id, then change attribute in state
    let newCartContents = [...this.state.productCartContents]; // create copy of state array
    newCartContents[
      this.state.productCartContents.findIndex(
        (cartItem) => cartItem.cartItemId === uuid
      )
    ].attributesSelected.attributeSelectedCapacity = e.target.textContent; //new value
    this.setState((prevState) => ({
      productCartContents: (prevState.productCartContents = newCartContents),
    })); //update the value
    this.handleStateUpdate();
  };

  clearAttributeCache = async () => {
    let emptyValue = '';

    this.setState((prevState) => ({
      ...prevState,
      attributeSelectedCapacity: (prevState.attributeSelectedCapacity =
        emptyValue),
      attributeSelectedSize: (prevState.attributeSelectedSize = emptyValue),
      attributeSelectedColor: (prevState.attributeSelectedColor = emptyValue),
    }));
  };

  loadDefaultProductDescription = () => {
    //clear product description cache
    this.setState((prevState) => ({
      ...prevState,
      productDescription: null,
    }));
  };

  selectDefaultAttributes = async () => {
    //select first value in list of attributes by default
    this.clearAttributeCache();

    let defaultCapacity =
      this.state.productDescription?.product.attributes[
        this.state.productDescription?.product.attributes.findIndex(
          (attribute) => attribute.name === 'Capacity'
        )
      ]?.items[0].value;

    let defaultSize =
      this.state.productDescription?.product.attributes[
        this.state.productDescription?.product.attributes.findIndex(
          (attribute) => attribute.name === 'Size'
        )
      ]?.items[0].value;

    let defaultColor =
      this.state.productDescription?.product.attributes[
        this.state.productDescription?.product.attributes.findIndex(
          (attribute) => attribute.name === 'Color'
        )
      ]?.items[0].value;

    this.setState(
      (prevState) => ({
        attributeSelectedCapacity: (prevState.attributeSelectedCapacity =
          defaultCapacity),
        attributeSelectedSize: (prevState.attributeSelectedSize = defaultSize),
        attributeSelectedColor: (prevState.attributeSelectedColor =
          defaultColor),
      }),
      this.handleStateUpdate()
    );
  };

  addToCart = () => {
    let productId = window.location.pathname.substring(9);

    let findItemByIndex = this.state.productCartContents.findIndex(
      (cartItem) => cartItem.id === productId
    );

    let newProductData = {
      cartItemId: uuid(),
      id: productId,
      name: this.state.productDescription.product.name,
      inStock: this.state.productDescription.product.inStock,
      gallery: this.state.productDescription.product.gallery,
      brand: this.state.productDescription.product.brand,
      prices: this.state.productDescription.product.prices,
      attributes: this.state.productDescription.product.attributes,
      description: this.state.productDescription.product.description,
      category: this.state.productDescription.product.category,
      quantity: 1,
      attributesSelected: {
        attributeSelectedColor: this.state.attributeSelectedColor,
        attributeSelectedSize: this.state.attributeSelectedSize,
        attributeSelectedCapacity: this.state.attributeSelectedCapacity,
      },
    };

    let cartItem = this.state.productCartContents[findItemByIndex];
    cartItem !== undefined
      ? //if attributes selected are different than in any object in cart with the same id then create new object
        String(cartItem.attributesSelected.attributeSelectedSize) ===
          String(this.state.attributeSelectedSize) &&
        String(cartItem.attributesSelected.attributeSelectedCapacity) ===
          String(this.state.attributeSelectedCapacity) &&
        String(cartItem.attributesSelected.attributeSelectedColor) ===
          String(this.state.attributeSelectedColor)
        ? (cartItem.quantity += 1) //else if attributes are the same as any item already present in cart then add quantity + 1
        : this.setState((prevState) =>
            //add new item to cart with selected attributes
            ({
              productCartContents: (prevState.productCartContents = [
                ...this.state.productCartContents,
                newProductData,
              ]),
            })
          )
      : //if no item with the specified id is found in the cart then add new object to the cart wth specified attributes
        this.setState((prevState) =>
          //otherwise add new item to cart with selected attributes
          ({
            productCartContents: (prevState.productCartContents = [
              ...this.state.productCartContents,
              newProductData,
            ]),
          })
        );
    this.handleStateUpdate();
  };

  addToCartFromPLP = (id) => {
    // console.log('id ' + id);
    axios(GET_PRODUCT_DETAILS(id)).then((response) => {
      let findItemByIndex = this.state.productCartContents.findIndex(
        (cartItem) => cartItem.id === id
      );

      let newProductData = {
        cartItemId: uuid(),
        id: response.data.data.product.id,
        name: response.data.data.product.name,
        inStock: response.data.data.product.inStock,
        gallery: response.data.data.product.gallery,
        brand: response.data.data.product.brand,
        prices: response.data.data.product.prices,
        attributes: response.data.data.product.attributes,
        description: response.data.data.product.description,
        category: response.data.data.product.category,
        quantity: 1,
        attributesSelected: {
          attributeSelectedColor: '',
          attributeSelectedSize: '',
          attributeSelectedCapacity: '',
        },
      };

      let updatedItem = this.state.productCartContents[findItemByIndex];

      this.state.productCartContents[findItemByIndex] !== undefined
        ? (updatedItem.quantity += 1)
        : this.setState({
            productCartContents: [
              ...this.state.productCartContents,
              newProductData,
            ],
          });
    });
    this.handleStateUpdate();
  };

  cartItemAddOne = (cartItemId) => {
    //find cart item by id in cart list & increment quantity

    let findItemByIndex = this.state.productCartContents.findIndex(
      (cartItem) => cartItem.cartItemId === cartItemId
    );

    let updatedItem = this.state.productCartContents[findItemByIndex];
    updatedItem.quantity += 1;

    this.setState((prevState) => ({
      ...prevState.productCartContents,
    }));

    this.handleStateUpdate();
  };

  cartItemSubtractOne = (cartItemId) => {
    let findItemByIndex = this.state.productCartContents.findIndex(
      (cartItem) => cartItem.cartItemId === cartItemId
    );

    let updatedItem = this.state.productCartContents[findItemByIndex];
    updatedItem.quantity -= 1;

    if (updatedItem.quantity > 0) {
      this.setState((prevState) => ({
        productCartContents: (prevState.productCartContents = [
          ...this.state.productCartContents,
        ]),
      }));
    } else {
      this.setState((prevState) => ({
        productCartContents: (prevState.productCartContents = [
          ...this.state.productCartContents.filter(
            (product) => product.cartItemId !== cartItemId
          ),
        ]),
      }));
    }

    this.handleStateUpdate();
  };

  getCartItemsCount = () => {
    return this.state.productCartContents
      .map((cartItem) => cartItem.quantity)
      .reduce((a, b) => a + b, 0);
  };

  getCartTotal = () => {
    let total =
      this.state.productCartContents.length === 0
        ? 0
        : parseFloat(
            this.state.productCartContents
              .map(
                (cartItem) =>
                  cartItem.prices[
                    this.state.currencies
                      .map((element) => {
                        return element.symbol;
                      })
                      .indexOf(this.state.currency)
                  ].amount * cartItem.quantity
              )
              .reduce(
                (previousValue, currentValue) => previousValue + currentValue
              )
          ).toFixed(2);
    this.setState((prevState) => ({
      cartTotal: (prevState.cartTotal = total),
    }));
  };

  handleLocalStorage = () => {
    localStorage.setItem('appState', JSON.stringify(this.state));
  };

  handleStateUpdate = () => {
    this.handleLocalStorage();
    this.getCartTotal();
    this.getCartItemsCount();
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
      attributesSelected,
      attributeSelectedColor,
      attributeSelectedSize,
      attributeSelectedCapacity,
      productCartContents,
      cartTotal,
    } = this.state;
    const {
      toggleCartOverlay,
      getProductCategories,
      loadProductCategory,
      getProducts,
      getProductDescription,
      getCurrencies,
      handleCurrencyChange,
      selectAttributeColor,
      selectAttributeColorById,
      selectAttributeSize,
      selectAttributeSizeById,
      selectAttributeCapacity,
      selectAttributeCapacityById,
      clearAttributeCache,
      loadDefaultProductDescription,
      selectDefaultAttributes,
      addToCart,
      addToCartFromPLP,
      cartItemAddOne,
      cartItemSubtractOne,
      getCartItemsCount,
      getCartTotal,
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
          attributesSelected,
          attributeSelectedColor,
          attributeSelectedSize,
          attributeSelectedCapacity,
          productCartContents,
          cartTotal,
          toggleCartOverlay,
          getProductCategories,
          loadProductCategory,
          getProducts,
          getProductDescription,
          getCurrencies,
          handleCurrencyChange,
          selectAttributeColor,
          selectAttributeColorById,
          selectAttributeSize,
          selectAttributeSizeById,
          selectAttributeCapacity,
          selectAttributeCapacityById,
          clearAttributeCache,
          loadDefaultProductDescription,
          selectDefaultAttributes,
          addToCart,
          addToCartFromPLP,
          cartItemAddOne,
          cartItemSubtractOne,
          getCartItemsCount,
          getCartTotal,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }

  componentDidMount() {
    let currentState = this.state;
    localStorage.setItem('appState', JSON.stringify(currentState)); //save state to localStorage
  }
}

export default AppContext;
