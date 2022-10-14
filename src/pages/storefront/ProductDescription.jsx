import React from 'react';
import AppContext from '../../context/AppContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductDescriptionContent from '../../components/ProductDescriptionContent';

class ProductDescription extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <>
        {this.context.productDescription ? (
          <ProductDescriptionContent />
        ) : (
          <div style={{ margin: '200px' }}><LoadingSpinner/></div>
        )}
      </>
    );
  }

  componentDidMount() {
    // this.context.getProductDescription();
    this.context.contextReducer(this.state, {type: 'GET_PRODUCT_DESCRIPTION'});
  }
}

export default ProductDescription;
