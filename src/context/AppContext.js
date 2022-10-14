//context api used to manage global state

import React, { Component } from 'react';
import axios from 'axios'; //data fetch library
import uuid from 'react-uuid'; //unique id for product cards and cart items
import initialState from './InitialState'; //default state used for initialization & saved to localStorage or first run

//graphQL queries
import {
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCT_CATEGORY,
  GET_PRODUCT_DETAILS,
  GET_CURRENCIES,
} from '../graphql/Queries';

const AppContext = React.createContext();

export class AppProvider extends Component {
  state = JSON.parse(localStorage.getItem('appState')) ?? initialState; //load state from localStorage or from initialState default

  contextReducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE_CART_OVERLAY':
        this.setState((prevState) => {
          return {
            ...prevState,
            cartOverlayVisibility: !prevState.cartOverlayVisibility,
            modalOverlayMaskVisibility: !prevState.modalOverlayMaskVisibility,
          };
        });
        break;

      case 'GET_PRODUCT_CATEGORIES':
        try {
          axios(GET_PRODUCT_CATEGORIES).then((result) => {
            this.setState((prevState) => ({
              ...prevState,
              loading: (prevState.loading = false),
              productCategories: (prevState.productCategories =
                result.data.data.categories),
            }));
          });
        } catch (err) {
          console.log(err);
        }
        break;

      case 'LOAD_PRODUCT_CATEGORY':
        this.setState((prevState) => ({
          ...prevState,
          productsDataLoading: true,
        }));
        break;

      case 'GET_PRODUCT_CATEGORY':
        if (window.location.pathname.substring(1) !== '') {
          try {
            axios(
              GET_PRODUCT_CATEGORY(window.location.pathname.substring(1))
            ).then((result) => {
              this.setState((prevState) => ({
                productsDataLoading: (prevState.productsDataLoading = false),
                productsData: (prevState.productsData =
                  result.data.data.category.products),
              }));
            });
          } catch (err) {
            console.log(err);
          }
        }
        break;

      case 'GET_PRODUCT_DESCRIPTION':
        const getProductDescription = async () => {
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
            ...prevState,
            loadingProductDescription:
              (prevState.loadingProductDescription = false),
            productDescription: (prevState.productDescription =
              newProductDescription),
          }));
        };
        getProductDescription();
        break;

      case 'GET_CURRENCIES':
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
          axios(GET_CURRENCIES).then((result) => {
            this.setState((prevState) => ({
              ...prevState,
              currencies: (prevState.currencies = result.data.data.currencies),
              currency: (prevState.currency =
                result.data.data.currencies[currencyIndex()].symbol),
            }));
          });
        } catch (err) {
          console.log(err);
        }
        break;

      case 'HANDLE_CURRENCY_CHANGE':
        const handleCurrencyChange = async (action) => {
          let currencyUpdate = action.payload.target.value;
          await this.setState((prevState) => ({
            ...prevState,
            currency: (prevState.currency = currencyUpdate),
          }));
          this.handleStateUpdate();
        };
        handleCurrencyChange(action);
        break;

      case 'SELECT_ATTRIBUTE_COLOR':
        const selectAttributeColor = (action) => {
          //change color attribute in product page
          this.setState((prevState) => ({
            ...prevState,
            attributeSelectedColor: (prevState.attributeSelectedColor =
              action.payload.target.textContent),
          }));
          this.handleStateUpdate();
        };
        selectAttributeColor(action);
        break;

      case 'SELECT_ATTRIBUTE_SIZE':
        const selectAttributeSize = (action) => {
          //change color attribute in product page
          this.setState((prevState) => ({
            ...prevState,
            attributeSelectedSize: (prevState.attributeSelectedSize =
              action.payload.target.textContent),
          }));
          this.handleStateUpdate();
        };
        selectAttributeSize(action);
        break;

      case 'SELECT_ATTRIBUTE_CAPACITY':
        const selectAttributeCapacity = (action) => {
          //change color attribute in product page
          this.setState((prevState) => ({
            ...prevState,
            attributeSelectedCapacity: (prevState.attributeSelectedCapacity =
              action.payload.target.textContent),
          }));
          this.handleStateUpdate();
        };
        selectAttributeCapacity(action);
        break;

      case 'CLEAR_ATTRIBUTE_CACHE':
        let emptyValue = '';
        this.setState((prevState) => ({
          ...prevState,
          attributeSelectedCapacity: (prevState.attributeSelectedCapacity =
            emptyValue),
          attributeSelectedSize: (prevState.attributeSelectedSize = emptyValue),
          attributeSelectedColor: (prevState.attributeSelectedColor =
            emptyValue),
        }));
        break;

      case 'CLEAR_PRODUCT_DESCRIPTION_CACHE':
        //clear product description cache
        this.setState((prevState) => ({
          ...prevState,
          productDescription: null,
        }));
        break;

      case 'SELECT_DEFAULT_ATTRIBUTES':
        const selectDefaultAttributes = () => {
          //select first value in list of attributes by default
          //////////////////////////////////////////////////
          let emptyValue = '';

          this.setState((prevState) => ({
            ...prevState,
            attributeSelectedCapacity: (prevState.attributeSelectedCapacity =
              emptyValue),
            attributeSelectedSize: (prevState.attributeSelectedSize =
              emptyValue),
            attributeSelectedColor: (prevState.attributeSelectedColor =
              emptyValue),
          }));

          //////////////////////////////////////////////////

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

          this.setState((prevState) => ({
            ...prevState,
            attributeSelectedCapacity: (prevState.attributeSelectedCapacity =
              defaultCapacity),
            attributeSelectedSize: (prevState.attributeSelectedSize =
              defaultSize),
            attributeSelectedColor: (prevState.attributeSelectedColor =
              defaultColor),
          }));
        };
        selectDefaultAttributes();
        break;

      case 'ADD_TO_CART':
        const addToCart = async () => {
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
                    ...prevState,
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
                  ...prevState,
                  productCartContents: (prevState.productCartContents = [
                    ...this.state.productCartContents,
                    newProductData,
                  ]),
                })
              );
          this.handleStateUpdate();
        };
        addToCart();
        break;

      case 'ADD_TO_CART_FROM_PLP':
        const addToCartFromPLP = async (action) => {
          let id = action.payload;
          await axios(GET_PRODUCT_DETAILS(id)).then((response) => {
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
                attributeSelectedColor:
                  response.data.data.product.attributes[
                    response.data.data.product.attributes.findIndex(
                      (attribute) => {
                        return attribute.id === 'Color';
                      }
                    )
                  ]?.items[0].value,
                attributeSelectedSize:
                  response.data.data.product.attributes[
                    response.data.data.product.attributes.findIndex(
                      (attribute) => {
                        return attribute.id === 'Size';
                      }
                    )
                  ]?.items[0].value,
                attributeSelectedCapacity:
                  response.data.data.product.attributes[
                    response.data.data.product.attributes.findIndex(
                      (attribute) => {
                        return attribute.id === 'Capacity';
                      }
                    )
                  ]?.items[0].value,
              },
            };

            let updatedItem = this.state.productCartContents[findItemByIndex];

            this.state.productCartContents[findItemByIndex] !== undefined
              ? (updatedItem.quantity += 1)
              : this.setState((prevState) => ({
                  ...prevState,
                  productCartContents: [
                    ...prevState.productCartContents,
                    newProductData,
                  ],
                }));
          });
          this.handleStateUpdate();
        };
        addToCartFromPLP(action);
        break;

      case 'CART_ITEM_ADD_ONE':
        const cartItemAddOne = (action) => {
          const cartItemId = action.payload;
          //find cart item by id in cart list & increment quantity
          let findItemByIndex = this.state.productCartContents.findIndex(
            (cartItem) => cartItem.cartItemId === cartItemId
          );

          let updatedItem = this.state.productCartContents[findItemByIndex];
          updatedItem.quantity += 1;

          this.setState((prevState) => ({
            ...prevState,
          }));
          this.handleStateUpdate();
        };
        cartItemAddOne(action);
        break;

      case 'CART_ITEM_SUBTRACT_ONE':
        const cartItemSubtractOne = async (action) => {
          let cartItemId = action.payload;
          let findItemByIndex = this.state.productCartContents.findIndex(
            (cartItem) => cartItem.cartItemId === cartItemId
          );

          let updatedItem = this.state.productCartContents[findItemByIndex];
          updatedItem.quantity -= 1;

          if (updatedItem.quantity > 0) {
            this.setState((prevState) => ({
              ...prevState,
            }));
          } else {
            this.setState((prevState) => ({
              ...prevState,
              productCartContents: (prevState.productCartContents = [
                ...prevState.productCartContents.filter(
                  (product) => product.cartItemId !== cartItemId
                ),
              ]),
            }));
          }
          this.handleStateUpdate();
        };
        cartItemSubtractOne(action);
        break;

      case 'CLEAR_PRODUCT_LISTING_DATA': //clear product listing from cache on return to root page '/'
        this.setState((prevState) => ({
          ...prevState,
          productsData: (prevState.productsData = []),
        }));
        this.handleStateUpdate();
        break;

      default:
        return state;
    }
  };

  //utility functions
  getCartItemsCount = () => {
    let cartCount = this.state.productCartContents
      .map((cartItem) => cartItem.quantity)
      .reduce((a, b) => a + b, 0);
    return cartCount;
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

  handleCartReset = () => {
    // filter out items with quantity of 0 from cart array
    this.setState((prevState) => ({
      ...prevState,
      productCartContents: (prevState.productCartContents = [
        ...prevState.productCartContents.filter(
          (product) => product.quantity > 0
        ),
      ]),
    }));
  };

  handleLocalStorage = () => {
    //save data to local storage
    localStorage.setItem('appState', JSON.stringify(this.state));
  };

  handleStateUpdate = () => {
    this.handleCartReset();
    this.getCartTotal();
    this.getCartItemsCount();
    this.handleLocalStorage();
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
      getProductCategory,
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
      handleStateUpdate,
      handleCartReset,
      getCartItemsCount,
      getCartTotal,
      contextReducer,
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
          getProductCategory,
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
          handleStateUpdate,
          handleCartReset,
          getCartItemsCount,
          getCartTotal,
          contextReducer,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }

  componentDidMount() {
    this.handleStateUpdate(); //save current state to local storage
  }
}

export default AppContext;
