import React from "react";
import "./styles/style.css";

import Navbar from "./components/Navbar"
import ProductListing from "./pages/storefront/ProductListing"
import ProductDescription from "./pages/storefront/ProductDescription"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {/* <ProductListing /> */}
        <ProductDescription />
      </div>
    );
  }
}

export default App;
