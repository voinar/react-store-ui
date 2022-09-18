import React from 'react';
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
  componentDidMount() {
    this.context.loadDefaultProductDescription();
  }
}

export default ProductListing;
