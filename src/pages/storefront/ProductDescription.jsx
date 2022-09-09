import React from "react";
import parse from "html-react-parser";
import AppContext from "../../context/AppContext";

import { GET_PRODUCT_DETAILS } from "../../graphql/Queries";
import uuid from "react-uuid";


import ProductDescriptionContent from "../../components/ProductDescriptionContent";

class ProductDescription extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <>
        {this.context.productDescription ? (
          <ProductDescriptionContent />
        ) : (
          <div style={{ margin: "200px" }}>"loading product data..."</div>
        )}
      </>
    );
  }

  componentDidMount() {
    this.context.getProductDescription();
    this.context.clearAttributeCache();
  }
}

export default ProductDescription;
