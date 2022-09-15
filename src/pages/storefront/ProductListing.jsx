import React from 'react';
import ProductCard from '../../components/ProductCard';
// import { data } from '../../data/data.js'
import Products from '../../components/Products';
import AppContext from '../../context/AppContext';

class ProductListing extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <div className="product-listing section-container">
        <header>
          <h1>{this.props.category}</h1>
        </header>

        <div>
          <Products />
        </div>
      </div>
    );
  }
}

export default ProductListing;
