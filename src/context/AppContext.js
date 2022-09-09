import React, { Component } from "react";
import axios from "axios";
import uuid from "react-uuid";

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
    currency: "",
    productsDataLoading: true,
    productDescription: null,
    attributesSelected: [],

    attributeSelectedColor: "",
    attributeSelectedSize: "",
    attributeSelectedCapacity: "",

    productCartContents: [
      {
        cartItemId: "215552-e72-c132-d2cd-ba135cbdbb",
        id: "huarache-x-stussy-le",
        name: "Nike Air Huarache Le",
        inStock: true,
        gallery: [
          "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
          "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
          "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
          "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
          "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
        ],
        brand: "Nike x Stussy",
        prices: [
          { currency: { label: "USD", symbol: "$" }, amount: 144.69 },
          { currency: { label: "GBP", symbol: "£" }, amount: 104 },
          { currency: { label: "AUD", symbol: "A$" }, amount: 186.65 },
          { currency: { label: "JPY", symbol: "¥" }, amount: 15625.24 },
          { currency: { label: "RUB", symbol: "₽" }, amount: 10941.76 },
        ],
        attributes: [
          {
            id: "Size",
            name: "Size",
            type: "text",
            items: [
              { displayValue: "40", value: "40", id: "40" },
              { displayValue: "41", value: "41", id: "41" },
              { displayValue: "42", value: "42", id: "42" },
              { displayValue: "43", value: "43", id: "43" },
            ],
          },
        ],
        description: "<p>Great sneakers for everyday use!</p>",
        category: "clothes",
        quantity: 1,
        attributesSelected: {
          attributeSelectedColor: "",
          attributeSelectedSize: "42",
          attributeSelectedCapacity: "",
        },
      },
      {
        cartItemId: "7c27242-2fde-c426-820a-da72b4f5153",
        id: "ps-5",
        name: "PlayStation 5",
        inStock: false,
        gallery: [
          "https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg",
          "https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg",
          "https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg",
          "https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg",
          "https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg",
        ],
        brand: "Sony",
        prices: [
          { currency: { label: "USD", symbol: "$" }, amount: 844.02 },
          { currency: { label: "GBP", symbol: "£" }, amount: 606.67 },
          { currency: { label: "AUD", symbol: "A$" }, amount: 1088.79 },
          { currency: { label: "JPY", symbol: "¥" }, amount: 91147.25 },
          { currency: { label: "RUB", symbol: "₽" }, amount: 63826.91 },
        ],
        attributes: [
          {
            id: "Color",
            name: "Color",
            type: "swatch",
            items: [
              { displayValue: "Green", value: "#44FF03", id: "Green" },
              { displayValue: "Cyan", value: "#03FFF7", id: "Cyan" },
              { displayValue: "Blue", value: "#030BFF", id: "Blue" },
              { displayValue: "Black", value: "#000000", id: "Black" },
              { displayValue: "White", value: "#FFFFFF", id: "White" },
            ],
          },
          {
            id: "Capacity",
            name: "Capacity",
            type: "text",
            items: [
              { displayValue: "512G", value: "512G", id: "512G" },
              { displayValue: "1T", value: "1T", id: "1T" },
            ],
          },
        ],
        description:
          "<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>",
        category: "tech",
        quantity: 1,
        attributesSelected: {
          attributeSelectedColor: "#000000",
          attributeSelectedSize: "",
          attributeSelectedCapacity: "1T",
        },
      },
      {
        cartItemId: "07e53d-701-b0d1-cc24-35f1d0c7caec",
        id: "apple-airtag",
        name: "AirTag",
        inStock: true,
        gallery: [
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000",
        ],
        brand: "Apple",
        prices: [
          { currency: { label: "USD", symbol: "$" }, amount: 120.57 },
          { currency: { label: "GBP", symbol: "£" }, amount: 86.67 },
          { currency: { label: "AUD", symbol: "A$" }, amount: 155.54 },
          { currency: { label: "JPY", symbol: "¥" }, amount: 13021.04 },
          { currency: { label: "RUB", symbol: "₽" }, amount: 9118.13 },
        ],
        attributes: [],
        description:
          "\n<h1>Lose your knack for losing things.</h1>\n<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>\n",
        category: "tech",
        quantity: 1,
        attributesSelected: {
          attributeSelectedColor: "",
          attributeSelectedSize: "",
          attributeSelectedCapacity: "",
        },
      },
    ],
    productCartItemsCount: 0,
    cartTotal: 0,
  };

  logPrompt = () => {
    console.log("context loaded");
  };

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
      const query = await axios(GET_PRODUCT_CATEGORIES).then((result) => {
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
  };

  getCurrencies = async () => {
    try {
      const query = await axios(GET_CURRENCIES).then((result) => {
        this.setState({
          currencies: result.data.data.currencies,
          currency: result.data.data.currencies[0].symbol,
        });
      });
    } catch (err) {
      console.log(err);
    }
    // console.log('currencies loaded')
  };

  handleCurrencyChange = (e) => {
    this.setState({ currency: e.target.value });
    // console.log("handle curency change: " + this.state.currency);
  };

  selectAttributeColor = (e) => {
    this.setState({
      attributeSelectedColor: e.target.textContent,
    });

    // this.setState({
    //   productCartContents: [
    //     ...this.context.productCartContents,
    //     (this.context.productCartContents.productCartContents[0].attributesSelected.attributeSelectedColor =
    //       e.target.textContent),
    //   ],
    // })
  };

  selectAttributeSize = (e) => {
    this.setState({
      attributeSelectedSize: e.target.textContent,
    });
  };

  selectAttributeCapacity = (e) => {
    this.setState({
      attributeSelectedCapacity: e.target.textContent,
    });
  };

  clearAttributeCache = () => {
    this.setState({
      attributeSelectedCapacity: "",
      attributeSelectedSize: "",
      attributeSelectedColor: "",
    });
  };

  addToCart = () => {
    const productId = window.location.pathname.substring(9);

    let findItemByIndex = this.state.productCartContents.findIndex(
      (cartItem) => cartItem.id === productId
    );

    let updatedItem = this.state.productCartContents[findItemByIndex];
    this.state.productCartContents[findItemByIndex] !== undefined
      ? (updatedItem.quantity += 1)
      : this.setState({
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
    this.getCartTotal();
    this.getProductCartItemsCount();
  };

  addToCartFromPLP = (id) => {
    console.log("id " + id);
    axios(GET_PRODUCT_DETAILS(id)).then((response) => {
      let findItemByIndex = this.state.productCartContents.findIndex(
        (cartItem) => cartItem.id === id
      );

      let updatedItem = this.state.productCartContents[findItemByIndex];

      this.state.productCartContents[findItemByIndex] !== undefined
        ? (updatedItem.quantity += 1)
        : this.setState(
            {
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
                    attributeSelectedColor: "",
                    attributeSelectedSize: "",
                    attributeSelectedCapacity: "",
                  },
                },
              ],
            },
            () => {
              this.getProductCartItemsCount();
            }
          );
    });
    this.getCartTotal();
    this.getProductCartItemsCount();
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

    this.getCartTotal();
    this.getProductCartItemsCount();
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
    this.getCartTotal();
    this.getProductCartItemsCount();
  };

  getProductCartItemsCount = () => {
    const productCartItemsCount = this.state.productCartContents
      .map((cartItem) => cartItem.quantity)
      .reduce((a, b) => a + b, 0);

    this.setState({ productCartItemsCount: productCartItemsCount });

    //   this.setState(prevState => ({
    //     count: prevState.count + 1,
    // }), this.doubledCount)
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

  // getCartTotal = () => {
  //   let total = this.state.cartTotal;

  //   total = parseFloat(
  //     this.state.productCartContents === 0
  //       ? 0
  //       : this.state.productCartContents
  //           .map(
  //             (prices) =>
  //               prices.prices[
  //                 this.state.productCartContents[0].prices.findIndex(
  //                   (obj) => obj.currency.symbol === this.state.currency
  //                 )
  //               ].amount
  //           )
  //           .reduce(
  //             (previousValue, currentValue) => previousValue + currentValue,
  //             total
  //           )
  //   ).toFixed(2);
  //   this.setState({ cartTotal: 100 });
  // };

  render() {
    console.log("cart state: " + this.state.productCartItemsCount);

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
      // getCategories,
      logPrompt,
      toggleModalOverlayMask,
      getProductCategories,
      loadProductCategory,
      getProducts,
      getProductDescription,
      getCurrencies,
      handleCurrencyChange,
      selectAttributeColor,
      selectAttributeSize,
      selectAttributeCapacity,
      clearAttributeCache,
      addToCart,
      addToCartFromPLP,
      cartItemAddOne,
      cartItemSubtractOne,
      getProductCartItemsCount,
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
          logPrompt,
          toggleModalOverlayMask,
          getProductCategories,
          loadProductCategory,
          getProducts,
          getProductDescription,
          getCurrencies,
          handleCurrencyChange,
          selectAttributeColor,
          selectAttributeSize,
          selectAttributeCapacity,
          clearAttributeCache,
          addToCart,
          addToCartFromPLP,
          cartItemAddOne,
          cartItemSubtractOne,
          getProductCartItemsCount,
          getCartTotal,
        }}
      >
        {this.props.children}

        {/* {console.dir(this.state.productCartContents)} */}
      </AppContext.Provider>
    );
  }

}

export default AppContext;
