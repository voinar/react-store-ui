import React from "react";
import parse from "html-react-parser";
import AppContext, { AppProvider } from "../../context/AppContext";
import axios from "axios";

import { GET_PRODUCT_DETAILS } from "../../graphql/Queries";

class ProductDescription extends React.Component {
  static contextType = AppContext;
  state = {
    loading: true,
    product: null,
    expandImagePreviewIndex: 0,
  };
  // productId = window.location.pathname.substring(9) //get product id w/o '/product/' prefix for use in database query

  getProductDescription = async () => {
    const productId = window.location.pathname.substring(9);
    try {
      const getProductDetails = await axios(
        GET_PRODUCT_DETAILS(productId)
      ).then((response) => {
        this.setState({
          loading: false,
          product: response.data.data,
        });
      });
    } catch (err) {
      console.log(err);
    }

    console.log("getProductDescription: " + JSON.stringify(this.state));
  };

  render() {
    const expandImagePreviewIndex = this.state.expandImagePreviewIndex;

    const expandImagePreview = (e) => {
      return this.setState({
        expandImagePreviewIndex: this.state.product.product.gallery.indexOf(
          e.target.src
        ),
      });
    };

    const currencySelectedIndex = this.context.currencies
      .map((element) => {
        return element.symbol;
      })
      .indexOf(this.context.currency);

    // const currencySelectedIndex = this.context.currencies.map(element => {return element.symbol}).indexOf(this.context.currency);

    return (
      <>
        {this.state.product ? (
          <div className="product-description section-container">
            <div className="product-description__images">
              <div className="product-description__images-small">
                {/* {data.categories[categoryIndex].products.map((obj) => {
              return <ProductCard
              key={obj.id}
              productUrl={obj.id}
              name={obj.name}
              image={obj.gallery[0]}
              priceSymbol={obj.prices[0].currency.symbol}
              priceAmount={obj.prices[0].amount}
              />;
            })} */}
                {this.state.product.product.gallery.map((image) => {
                  return (
                    <div
                      key={image}
                      className="product-description__image-small"
                      onClick={expandImagePreview}
                    >
                      <img src={image} alt="product" />
                    </div>
                  );
                })}
              </div>
              <div className="product-description__image-large">
                <img
                  src={
                    this.state.product.product.gallery[expandImagePreviewIndex]
                  }
                  alt="product"
                />
              </div>
            </div>
            <div className="product-description__attributes">
              <div className="product-description__attribute-name">
                <span>{this.state.product.product.name}</span>
              </div>
              <div className="product-description__attribute-type">
                <span>{this.state.product.product.brand}</span>
              </div>
              <div className="product-description__attributes-select-size">
                <span className="product-description__attribute-category">
                  Size:
                </span>
                <div className="product-description__attributes-select-size-options">
                  <div className="product-description__attributes-size">XS</div>
                  <div className="product-description__attributes-size">S</div>
                  <div className="product-description__attributes-size">M</div>
                  <div className="product-description__attributes-size">L</div>
                </div>
              </div>
              <div className="product-description__attributes-select-color">
                <span className="product-description__attribute-category">
                  Color:
                </span>
                <div className="product-description__attributes-select-color-options">
                  <div className="product-description__attributes-color">1</div>
                  <div className="product-description__attributes-color">2</div>
                  <div className="product-description__attributes-color">3</div>
                </div>
              </div>
              <div className="product-description__attributes-price">
                <span className="product-description__attribute-category">
                  Price:
                </span>
                <span className="product-description__attributes-price-amount">
                  {
                    this.state.product.product.prices[currencySelectedIndex]
                      .currency.symbol
                  }
                  {
                    this.state.product.product.prices[currencySelectedIndex]
                      .amount
                  }
                </span>
              </div>
              <button className="product-description__button">
                Add to cart
              </button>
              <div className="product-description__contents">
                <span>{parse(this.state.product.product.description)}</span>
              </div>
            </div>
          </div>
        ) : (
          <h2>loading product description...</h2>
        )}
      </>
    );
  }

  componentDidMount() {
    this.getProductDescription();
    console.log("getting product description");
    console.log(JSON.stringify(this.state));
  }
}

export default ProductDescription;
