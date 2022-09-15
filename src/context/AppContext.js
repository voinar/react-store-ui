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

//util functions
import { toggleModalOverlayMask } from './utils/ToggleModalOverlayMask';

const AppContext = React.createContext();

export class AppProvider extends Component {
  static contextType = AppContext;

  // constructor(props) {
  //   super(props)
  //   const appState = localStorage.getItem("appState")
  //   this.state = appState ?? initialState;
  //   localStorage.setItem('appState', JSON.parse(this.state))
  // }

  state = JSON.parse(localStorage.getItem('appState')) ?? initialState; //load state from localStorage or from initialState default

  toggleModalOverlayMask = () => {
    this.setState({
      cartOverlayVisibility: !this.state.cartOverlayVisibility,
    });
    this.setState({
      modalOverlayMaskVisibility: !this.state.modalOverlayMaskVisibility,
    });
  };

  getProductCategories = async () => {
    try {
      await axios(GET_PRODUCT_CATEGORIES).then((result) => {
        this.setState({
          loading: false,
          productCategories: result.data.data.categories,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  loadProductCategory = (e) => {
    const productCategoryIndex = this.state.productCategories
      .map((category) => category.name)
      .indexOf(e.target.textContent);
    this.setState({ productCategoryIndex: productCategoryIndex });
  };

  getProducts = async () => {
    try {
      await axios(GET_PRODUCTS).then((result) => {
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
      await axios(GET_PRODUCT_DETAILS(productId)).then((response) => {
        this.setState({
          loadingProductDescription: false,
          productDescription: response.data.data,
        });
      });
    } catch (err) {
      console.log(err);
    }
    this.handleStateUpdate();
  };

  getCurrencies = async () => {
    let currencyIndex = this.state.currencies.findIndex(
      (currency) => currency.symbol === this.state.currency
    );

    try {
      await axios(GET_CURRENCIES).then((result) => {
        this.setState({
          currencies: result.data.data.currencies,
          currency: result.data.data.currencies[currencyIndex].symbol,
        });
      });
    } catch (err) {
      console.log(err);
    }
    // console.log('currencies loaded')
    this.handleStateUpdate();
  };

  handleCurrencyChange = async (e) => {
    let currencyUpdate = e.target.value;
    await this.setState({ currency: currencyUpdate });
    // console.log("handle curency change: " + this.state.currency);
    this.handleStateUpdate();
  };

  selectAttributeColor = (e) => {
    //change color attribute in product page
    this.setState({
      attributeSelectedColor: e.target.textContent,
    });
    // console.log(e.target);
    this.handleStateUpdate();
  };

  selectAttributeColorById = (e, uuid) => {
    //change color attribute in cart
    console.log('e ' + e.target.textContent);
    console.log('id ' + uuid);

    //select item by id
    //change attribute in state
    let newCartContents = [...this.state.productCartContents]; // create copy of state array
    newCartContents[
      this.state.productCartContents.findIndex(
        (cartItem) => cartItem.cartItemId === uuid
      )
    ].attributesSelected.attributeSelectedColor = e.target.textContent; //new value
    this.setState({ newCartContents }); //update the value
    this.handleStateUpdate();
  };

  selectAttributeSize = (e) => {
    this.setState({
      attributeSelectedSize: e.target.textContent,
    });
    this.handleStateUpdate();
  };

  selectAttributeSizeById = (e, uuid) => {
    //change size attribute in cart
    console.log('e ' + e.target.textContent);
    console.log('id ' + uuid);

    //select item by id
    //change attribute in state
    let newCartContents = [...this.state.productCartContents]; // create copy of state array
    newCartContents[
      this.state.productCartContents.findIndex(
        (cartItem) => cartItem.cartItemId === uuid
      )
    ].attributesSelected.attributeSelectedSize = e.target.textContent; //new value
    this.setState({ newCartContents }); //update the value
    this.handleStateUpdate();
  };

  selectAttributeCapacity = (e) => {
    this.setState({
      attributeSelectedCapacity: e.target.textContent,
    });
    this.handleStateUpdate();
  };

  selectAttributeCapacityById = (e, uuid) => {
    //change capacity attribute in cart
    console.log('e ' + e.target.textContent);
    console.log('id ' + uuid);

    //select item by id
    //change attribute in state
    let newCartContents = [...this.state.productCartContents]; // create copy of state array
    newCartContents[
      this.state.productCartContents.findIndex(
        (cartItem) => cartItem.cartItemId === uuid
      )
    ].attributesSelected.attributeSelectedCapacity = e.target.textContent; //new value
    this.setState({ newCartContents }); //update the value
    this.handleStateUpdate();
  };

  clearAttributeCache = () => {
    this.setState({
      attributeSelectedCapacity: '',
      attributeSelectedSize: '',
      attributeSelectedColor: '',
    });
    this.handleStateUpdate();
  };

  addToCart = async () => {
    let productId = window.location.pathname.substring(9);
    let findItemByIndex = this.state.productCartContents.findIndex(
      (cartItem) => cartItem.id === productId
    );
    // console.log(findItemByIndex);

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
        : this.setState(
            //otherwise add new item to cart with selected attributes
            {
              productCartContents: [
                ...this.state.productCartContents,
                {
                  cartItemId: uuid(),
                  id: productId,
                  name: this.state.productDescription.product.name,
                  inStock: this.state.productDescription.product.inStock,
                  gallery: this.state.productDescription.product.gallery,
                  brand: this.state.productDescription.product.brand,
                  prices: this.state.productDescription.product.prices,
                  attributes: this.state.productDescription.product.attributes,
                  description:
                    this.state.productDescription.product.description,
                  category: this.state.productDescription.product.category,
                  quantity: 1,
                  attributesSelected: {
                    attributeSelectedColor: this.state.attributeSelectedColor,
                    attributeSelectedSize: this.state.attributeSelectedSize,
                    attributeSelectedCapacity:
                      this.state.attributeSelectedCapacity,
                  },
                },
              ],
            }
          )
      : //if no item with the specified id is found in the cart then add new object to the cart wth specified attributes
        this.setState({
          productCartContents: [
            ...this.state.productCartContents,
            {
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
            },
          ],
        });
    this.handleStateUpdate();
  };

  addToCartFromPLP = async (id) => {
    // console.log('id ' + id);
    await axios(GET_PRODUCT_DETAILS(id)).then((response) => {
      let findItemByIndex = this.state.productCartContents.findIndex(
        (cartItem) => cartItem.id === id
      );

      let updatedItem = this.state.productCartContents[findItemByIndex];

      this.state.productCartContents[findItemByIndex] !== undefined
        ? (updatedItem.quantity += 1)
        : this.setState({
            productCartContents: [
              ...this.state.productCartContents,
              {
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
              },
            ],
          });
    });
    this.handleStateUpdate();
  };

  cartItemAddOne = (cartItemId) => {
    //get cart item id
    //find cart item by id in cart list
    //if cart item id quantity > 1 then subtract one
    //if cart item id quantity = 0 then remove from cart list

    let findItemByIndex = this.state.productCartContents.findIndex(
      (cartItem) => cartItem.cartItemId === cartItemId
    );

    let updatedItem = this.state.productCartContents[findItemByIndex];
    updatedItem.quantity += 1;

    this.setState({
      // productCartContents: [...this.state.productCartContents],
    });

    this.handleStateUpdate();
  };

  cartItemSubtractOne = (cartItemId) => {
    let findItemByIndex = this.state.productCartContents.findIndex(
      (cartItem) => cartItem.cartItemId === cartItemId
    );

    let updatedItem = this.state.productCartContents[findItemByIndex];
    updatedItem.quantity -= 1;

    if (updatedItem.quantity > 0) {
      this.setState({
        productCartContents: [
          ...this.state.productCartContents,
          // .filter(
          //   (product) => product.cartItemId !== cartItemId
          // ),
        ],
      });
    } else {
      this.setState({
        productCartContents: [
          ...this.state.productCartContents.filter(
            (product) => product.cartItemId !== cartItemId
          ),
        ],
      });
    }
    this.handleStateUpdate();
  };

  getCartItemsCount = () => {
    let productCartItemsCount = this.state.productCartContents
      .map((cartItem) => cartItem.quantity)
      .reduce((a, b) => a + b, 0);

    this.setState({ productCartItemsCount: productCartItemsCount });
  };

  getCartTotal = () => {
    let total = this.state.cartTotal;

    total =
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
    this.setState({ cartTotal: total });
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
    // console.log('cart count: ' + this.state.productCartItemsCount);

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
      productCartItemsCount,
      cartTotal,
    } = this.state;
    const {
      toggleModalOverlayMask,
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
          productCartItemsCount,
          cartTotal,
          toggleModalOverlayMask,
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
          addToCart,
          addToCartFromPLP,
          cartItemAddOne,
          cartItemSubtractOne,
          getCartItemsCount,
          getCartTotal,
        }}
      >
        {this.props.children}

        {/* {console.dir(this.state.productCartContents)} */}
      </AppContext.Provider>
    );
  }

  componentDidMount() {
    // console.log(JSON.parse(localStorage.getItem('appState')))

    // console.log(localStorage.getItem('appState'));

    // if (this.state) {
    //   this.setState({
    //     initialState,
    //   });

    localStorage.setItem('appState', JSON.stringify(this.state)); //save state to localStorage

    // }
  }
}

export default AppContext;
