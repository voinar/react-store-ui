import React from "react";
import "./styles/style.css";

import Navbar from "./components/Navbar"
import ModalOverlayMask from "./components/ModalOverlayMask"
import ProductListing from "./pages/storefront/ProductListing"
import ProductDescription from "./pages/storefront/ProductDescription"
import Cart from './pages/storefront/Cart'


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <ModalOverlayMask />
        <ProductListing />
        <ProductDescription />
        <Cart />
      </div>
    );
  }
}

export default App;
