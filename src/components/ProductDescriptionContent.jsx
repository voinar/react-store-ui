import React from "react";
import parse from "html-react-parser";
import AppContext from "../context/AppContext";
import uuid from "react-uuid";

class ProductDescriptionContent extends React.Component {
  static contextType = AppContext;

  state = {
    textDescriptionExpanded: false,
    expandImagePreviewIndex: 0,
  };

  expandImagePreview = (e) => {
    return this.setState({
      expandImagePreviewIndex:
        this.context.productDescription.product.gallery.indexOf(e.target.src),
    });
  };

  //expand or collapse product description text if longer than 300 characters
  toggleTextDescription = () => {
    this.setState({
      textDescriptionExpanded: !this.state.textDescriptionExpanded,
    });
  };

  getAttributeType = () => {
    //distinguish between size & capacity: find the property's index in attributes, then return the name of appropriate attribute
    return this.context.productDescription.product.attributes[
      this.context.productDescription.product.attributes.findIndex((items) => {
        switch (items.name) {
          case "Size":
            // console.log("attr type: " + items.name);
            return "Size";
          case "Capacity":
            // console.log("attr type: " + items.name);
            return "Capacity";
        }
      })
    ].name;
  };

  render() {
    return (
      <div className="product-description section-container">
        <div
          className={
            this.context.productDescription.product.inStock
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
                  onClick={this.expandImagePreview}
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
                  this.state.expandImagePreviewIndex
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

          {this.context.productDescription.product.attributes.length > 0 ? ( // size selection
            <div className="product-description__attributes-select-size">
              <span className="product-description__attribute-category">
                {
                  this.getAttributeType() // get attribute type (size/capacity)
                }
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
                ].items.map((attribute) => {
                  return this.getAttributeType() === "Capacity" ? (
                    <div
                      key={uuid()}
                      className={
                        //if attribute value is found in productAttributes list then change class to --selected
                        this.context.attributeSelectedCapacity !== ""
                          ? this.context.attributeSelectedCapacity ===
                            attribute.value
                            ? "product-description__attributes-size product-description__attributes-size--selected"
                            : "product-description__attributes-size"
                          : "product-description__attributes-size"
                      }
                      onClick={this.context.selectAttributeCapacity}
                    >
                      {attribute.value}
                    </div>
                  ) : (
                    <div
                      key={uuid()}
                      className={
                        //if attribute value is found in productAttributes list then change class to --selected
                        this.context.attributeSelectedSize !== ""
                          ? this.context.attributeSelectedSize ===
                            attribute.value
                            ? "product-description__attributes-size product-description__attributes-size--selected"
                            : "product-description__attributes-size"
                          : "product-description__attributes-size"
                      }
                      onClick={this.context.selectAttributeSize}
                    >
                      {attribute.value}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {this.context.productDescription.product.attributes.find((obj) => {
            return obj.type === "swatch";
          }) ? (
            <div className="product-description__attributes-select-color">
              <span className="product-description__attribute-category">
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
                      className={
                        this.context.attributeSelectedColor !== ""
                          ? this.context.attributeSelectedColor ===
                            colorOption.value
                            ? "product-description__attributes-color product-description__attributes-color--selected"
                            : "product-description__attributes-color"
                          : "product-description__attributes-color"
                      }
                      style={{
                        backgroundColor: `${colorOption.value}`,
                        color: "rgb(255,255,255,0)",
                      }}
                      onClick={this.context.selectAttributeColor}
                    >
                      {colorOption.value}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          <div className="product-description__attributes-price">
            <span className="product-description__attribute-category">
              Price:
            </span>
            <span className="product-description__attributes-price-amount">
              {
                this.context.productDescription.product.prices[
                  this.context.currencies
                    .map((element) => {
                      return element.symbol;
                    })
                    .indexOf(this.context.currency)
                ].currency.symbol
              }
              {
                this.context.productDescription.product.prices[
                  this.context.currencies
                    .map((element) => {
                      return element.symbol;
                    })
                    .indexOf(this.context.currency)
                ].amount
              }
            </span>
          </div>
          <button
            className={
              this.context.productDescription.product.inStock
                ? "product-description__button"
                : "product-description__button product-description__button--inactive"
            }
            onClick={
              this.context.productDescription.product.inStock
                ? this.context.addToCart
                : this.context.addToCart
              // : null
            } //add item to cart along with its properties using item data from context. null if item is not in stock
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
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDescriptionContent;