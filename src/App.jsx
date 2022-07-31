import React from "react";
import "./styles/style.css";

import Navbar from "./components/Navbar"
import ProductListing from "./pages/storefront/ProductListing"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <ProductListing />
        {/* <h1>h1h1</h1> */}
      </div>
    );
  }
}

export default App;
