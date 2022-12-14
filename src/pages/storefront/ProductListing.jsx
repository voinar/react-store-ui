import React from 'react';
import AppContext from '../../context/AppContext';
import Products from '../../components/Products';

class ProductListing extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <div className="product-listing section-container">
        <header>
          <h1>{this.props.category}</h1>
        </header>
        <Products />
      </div>
    );
  }
  componentDidMount() {
    this.context.contextReducer(this.state, {
      type: 'CLEAR_PRODUCT_DESCRIPTION_CACHE',
    });
  }
}

export default ProductListing;
