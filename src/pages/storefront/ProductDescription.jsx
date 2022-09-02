import React from "react";
import parse from "html-react-parser";
import AppContext, { AppProvider } from "../../context/AppContext";
import axios from "axios";

import { GET_PRODUCT_DETAILS } from "../../graphql/Queries";

import ProductDescriptionContent from "../../components/ProductDescriptionContent";

class ProductDescription extends React.Component {
  static contextType = AppContext;

  state = {
    loadingProductDescription: true,
    productDescription: null,
    productCategory: null,
    expandImagePreviewIndex: 0,
  };

  getProductDescription = async () => {
    const productId = window.location.pathname.substring(9);
    try {
      const getProductDetails = await axios(
        GET_PRODUCT_DETAILS(productId)
      ).then((response) => {
        this.setState({
          loadingProductDescription: false,
          productDescription: response.data.data,
          productCategory: response.data.data.product.category,
        });
      });
    } catch (err) {
      console.log(err);
    }
    console.log(
      "getProductDescription: " + JSON.stringify(this.state.productDescription)
    );
  };

  expandImagePreviewIndex = this.state.expandImagePreviewIndex;

  expandImagePreview = (e) => {
    return this.setState({
      expandImagePreviewIndex:
        this.state.productDescription.product.gallery.indexOf(e.target.src),
    });
  };

  render() {
    return (
      <>
        {this.state.productDescription ? (
          <ProductDescriptionContent
            productDescription={this.state.productDescription}
            expandImagePreviewIndex={this.state.expandImagePreviewIndex}
            expandImagePreview={this.expandImagePreview}
            inStock={this.state.productDescription.product.inStock}
          />
        ) : (
          <div style={{ margin: "200px" }}>"loading product data..."</div>
        )}
      </>
    );
  }

  componentDidMount() {
    this.getProductDescription();
    console.log(
      "product description local state: " + JSON.stringify(this.state)
    );
  }
}

export default ProductDescription;
