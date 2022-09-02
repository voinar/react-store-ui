import React from "react";
import parse from "html-react-parser";
import AppContext, { AppProvider } from "../context/AppContext";

class ProductDescriptionTypeTech extends React.Component {
  static contextType = AppContext;

  render() {
    const currencySelectedIndex = this.context.currencies
      .map((element) => {
        return element.symbol;
      })
      .indexOf(this.context.currency);

    return (
      <>
        <div className="product-description section-container">
          <div className="product-description__images">
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

            {this.props.productDescription.product.attributes[1].name ===
            "Color" ? (
              <div className="product-description__attributes-select-color">
                <span className="product-description__attribute-category">
                  Color:
                </span>
                <div className="product-description__attributes-select-color-options">
                  {this.props.productDescription.product.attributes[1].items.map(
                    (colorOption) => {
                      return (
                        <div
                          className="product-description__attributes-color"
                          style={{ backgroundColor: `${colorOption.value}` }}
                        ></div>
                      );
                    }
                  )}
                  {/* <div className="product-description__attributes-color">2</div>
                  <div className="product-description__attributes-color">3</div> */}
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
              className="product-description__button"
              onClick={this.context.addToCart}
              // onClick={(item, productId)=>this.context.addToCart(itemData, productId)}
              // onClick={()=>console.log(this.state.product.product.id)}
            >
              Add to cart
            </button>
            <div className="product-description__contents">
              <span>
                {parse(this.props.productDescription.product.description)}
              </span>
            </div>
          </div>
          {console.log(this.props.productDescription.product.attributes[1])}
        </div>
      </>
    );
  }
}

export default ProductDescriptionTypeTech;
