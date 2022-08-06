import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import "./styles/style.css";

import Navbar from "./components/Navbar";
import ModalOverlayMask from "./components/ModalOverlayMask";
import ProductListing from "./pages/storefront/ProductListing";
import ProductDescription from "./pages/storefront/ProductDescription";
import Cart from "./pages/storefront/Cart";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartOverlayVisibility: false,
      modalOverlayMaskVisibility: false,
      currency: "usd",
    };
    this.toggleCartOverlay = this.toggleCartOverlay.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  toggleCartOverlay() {
    this.setState({
      cartOverlayVisibility: !this.state.cartOverlayVisibility,
    });
    this.setState({
      modalOverlayMaskVisibility: !this.state.modalOverlayMaskVisibility,
    });
    console.log(this.state);
    // console.log('cart overlay status: ' + this.state.cartOverlayVisibility);
    // console.log('modal overlay status: ' + this.state.modalOverlayMaskVisibility);
  }

  handleCurrencyChange(event) {
    this.setState({ currency: event.target.value });
  }

  render() {
    return (
      <>
        <ApolloProvider client={client}>
          <Navbar
            toggleCartOverlay={this.toggleCartOverlay}
            cartOverlayVisibility={this.state.cartOverlayVisibility}
            onClick={this.toggleCartOverlay}
            currency={this.state.currency}
            handleCurrencyChange={this.handleCurrencyChange}
          />
          {/* <ModalOverlayMask /> */}
          {this.state.modalOverlayMaskVisibility && (
            <ModalOverlayMask toggleCartOverlay={this.toggleCartOverlay} />
          )}

          <Routes>
            <Route path="/" element={<ProductListing />} />
            <Route path="/products" element={<ProductDescription />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </ApolloProvider>
      </>
    );
  }
}

export default App;
