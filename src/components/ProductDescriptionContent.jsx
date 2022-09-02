import React from "react";
import parse from "html-react-parser";
import AppContext, { AppProvider } from "../context/AppContext";

class ProductDescriptionContent extends React.Component {
  static contextType = AppContext;

  state = {
    textDescriptionExpanded: false,
  };

  toggleTextDescription = () => {
    this.setState({
      textDescriptionExpanded: !this.state.textDescriptionExpanded,
    });
  };

  render() {
    const currencySelectedIndex = this.context.currencies
      .map((element) => {
        return element.symbol;
      })
      .indexOf(this.context.currency);

    return (
      <>
        <div className="product-description section-container">
          {console.log(this.props.inStock)}
          <div
            className={
              this.props.inStock
                ? "product-description__images"
                : "product-description__images product-description__images--unavailable"
            }
          >
            <div className="product-description__images-small">
              {this.props.productDescription.product.gallery.map((image) => {
                return (
                  <div
                    key={image}
                    className="product-description__image-small"
                    onClick={this.props.expandImagePreview}
                  >
                    <img src={image} alt="product" />
                  </div>
                );
              })}
            </div>
            <div className="product-description__image-large">
              <img
                src={
                  this.props.productDescription.product.gallery[
                    this.props.expandImagePreviewIndex
                  ]
                }
                alt="product"
              />
            </div>
          </div>
          <div className="product-description__attributes">
            <div className="product-description__attribute-name">
              <span>{this.props.productDescription.product.name}</span>
            </div>
            <div className="product-description__attribute-type">
              <span>{this.props.productDescription.product.brand}</span>
            </div>

            {this.props.productDescription.product.attributes.length > 0 ? (
              <div className="product-description__attributes-select-size">
                <span className="product-description__attribute-category">
                  Size:
                </span>
                <div className="product-description__attributes-select-size-options">
                  {this.props.productDescription.product.attributes[
                    this.props.productDescription.product.attributes.findIndex(
                      (items) => {
                        switch (items.name) {
                          case "Size":
                            return "Size";
                          case "Capacity":
                            return "Capacity";
                        }
                      }
                    )
                  ].items.map((value) => {
                    return (
                      <div className="product-description__attributes-size">
                        {value.value}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
            {this.props.productDescription.product.attributes.find((obj) => {
              return obj.type === "swatch";
            }) ? (
              <div className="product-description__attributes-select-color">
                <span className="product-description__attribute-category">
                  {console.log()}
                  Color:
                </span>
                <div className="product-description__attributes-select-color-options">
                  {this.props.productDescription.product.attributes[
                    this.props.productDescription.product.attributes.findIndex(
                      (items) => {
                        return items.type === "swatch";
                      }
                    )
                  ].items.map((colorOption) => {
                    return (
                      <div
                        className="product-description__attributes-color"
                        style={{ backgroundColor: `${colorOption.value}` }}
                      ></div>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="product-description__attributes-price">
              <span className="product-description__attribute-category">
                Price:
              </span>
              <span className="product-description__attributes-price-amount">
                {
                  this.props.productDescription.product.prices[
                    currencySelectedIndex
                  ].currency.symbol
                }
                {
                  this.props.productDescription.product.prices[
                    currencySelectedIndex
                  ].amount
                }
              </span>
            </div>
            <button
              className={this.props.inStock ?  "product-description__button" : "product-description__button product-description__button--inactive"}
              onClick={this.props.inStock ? this.context.addToCart : (()=>{})()}
            >
              Add to cart
            </button>

            <div className="product-description__contents">
              <span
                className={
                  this.state.textDescriptionExpanded
                    ? "product-description__contents--trim-text product-description__contents--expand-text"
                    : "product-description__contents--trim-text"
                }
              >
                {parse(this.props.productDescription.product.description)}
              </span>
              <button
                className="product-description__contents__toggle-text-button"
                onClick={this.toggleTextDescription}
              >
                {this.state.textDescriptionExpanded ? "See less" : "See more"}
              </button>
            </div>
          </div>
          {/* {console.log(this.props.productDescription.product.attributes)} */}
        </div>
      </>
    );
  }
}

export default ProductDescriptionContent;
