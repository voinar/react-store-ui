import React from "react";
import parse from "html-react-parser";
import AppContext from "../context/AppContext";
import uuid from "react-uuid";

class ProductDescriptionContent extends React.Component {
  static contextType = AppContext;

  state = {
    textDescriptionExpanded: false,
  };

  //expand or collapse product description text if longer than 300 characters
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
      <div className="product-description section-container">
        {/* {console.log(this.context.inStock)} */}
        <div
          className={
            this.context.productDescription.inStock
              ? "product-description__images"
              : "product-description__images product-description__images--unavailable"
          }
        >
          <div className="product-description__images-small">
            {this.context.productDescription.product.gallery.map((image) => {
              return (
                <div
                  key={uuid()}
                  className="product-description__image-small"
                  onClick={this.context.expandImagePreview}
                >
                  <img src={image} alt="product" />
                </div>
              );
            })}
          </div>
          <div className="product-description__image-large">
            <img
              src={
                this.context.productDescription.product.gallery[
                  this.context.expandImagePreviewIndex
                ]
              }
              alt="product"
            />
          </div>
        </div>
        <div className="product-description__attributes">
          <div className="product-description__attribute-name">
            <span>{this.context.productDescription.product.name}</span>
          </div>
          <div className="product-description__attribute-type">
            <span>{this.context.productDescription.product.brand}</span>
          </div>

          {this.context.productDescription.product.attributes.length > 0 ? (
            <div className="product-description__attributes-select-size">
              <span className="product-description__attribute-category">
                Size:
              </span>
              <div className="product-description__attributes-select-size-options">
                {this.context.productDescription.product.attributes[
                  this.context.productDescription.product.attributes.findIndex(
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
                    <div
                      key={uuid()}
                      className="product-description__attributes-size"
                    >
                      {value.value}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
          {this.context.productDescription.product.attributes.find((obj) => {
            return obj.type === "swatch";
          }) ? (
            <div className="product-description__attributes-select-color">
              <span className="product-description__attribute-category">
                {console.log()}
                Color:
              </span>
              <div className="product-description__attributes-select-color-options">
                {this.context.productDescription.product.attributes[
                  this.context.productDescription.product.attributes.findIndex(
                    (items) => {
                      return items.type === "swatch";
                    }
                  )
                ].items.map((colorOption) => {
                  return (
                    <div
                      key={uuid()}
                      className="product-description__attributes-color"
                      style={{ backgroundColor: `${colorOption.value}` }}
                    ></div>
                  );
                })}
              </div>
            </div>
          ) : (
            null
          )}
          <div className="product-description__attributes-price">
            <span className="product-description__attribute-category">
              Price:
            </span>
            <span className="product-description__attributes-price-amount">
              {
                this.context.productDescription.product.prices[
                  currencySelectedIndex
                ].currency.symbol
              }
              {
                this.context.productDescription.product.prices[
                  currencySelectedIndex
                ].amount
              }
            </span>
          </div>
          <button
            className={
              this.context.inStock
                ? "product-description__button"
                : "product-description__button product-description__button--inactive"
            }
            onClick={this.context.inStock ? this.context.addToCart : null} //add item to cart along with its properties
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
              {parse(this.context.productDescription.product.description)}
            </span>

            {/* //expand or collapse product description text if longer than 300 characters */}
            {this.context.productDescription.product.description.length >
            300 ? (
              <button
                className="product-description__contents__toggle-text-button"
                onClick={this.toggleTextDescription}
              >
                {this.state.textDescriptionExpanded ? "See less" : "See more"}
              </button>
            ) : (
              null
            )}
          </div>
        </div>
        {console.log(this.context.productDescription.product.attributes)}
      </div>
    );
  }
}

export default ProductDescriptionContent;
