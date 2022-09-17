import React from 'react';
import AppContext from '../../context/AppContext';
import ProductDescriptionContent from '../../components/ProductDescriptionContent';

class ProductDescription extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <>
        {this.context.productDescription ? (
          <ProductDescriptionContent />
        ) : (
          <div style={{ margin: '200px' }}>"loading product data..."</div>
        )}
      </>
    );
  }

  componentDidMount() {
    this.context.clearAttributeCache();
    this.context.getProductDescription();
    this.context.selectDefaultAttributes();
  }
}

export default ProductDescription;
