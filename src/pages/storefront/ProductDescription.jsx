import React from "react";

class ProductDescription extends React.Component {
  render() {
    return (
      <div className="product-description section-container">
        <div className="product-description__images">
          <div className="product-description__images-small">
            <div className="product-description__image-small">1</div>
            <div className="product-description__image-small">2</div>
            <div className="product-description__image-small">3</div>
          </div>
          <div className="product-description__images-large">
            <div className="product-description__image-large">4</div>
          </div>
        </div>
        <div className="product-descriptio__attributes">
          <div className="product-description__attribute-name">
            <span>Apollo</span>
          </div>
          <div className="product-description__attribute-type">
            <span>Running Short</span>
          </div>
          <div className="product-description__attributes-select-size">
            <span>Size:</span>
            <div className="product-description__attributes-size">XS</div>
            <div className="product-description__attributes-size">S</div>
            <div className="product-description__attributes-size">M</div>
            <div className="product-description__attributes-size">L</div>
          </div>
          <div className="product-description__attributes-select-color">
            <span>Color:</span>
            <div className="product-description__attributes-color">grey</div>
            <div className="product-description__attributes-color">black</div>
            <div className="product-description__attributes-color">green</div>
          </div>
          <div className="product-description__attributes-price">
            <h2>Price:</h2>
            <div className="product-description__attributes-price-amount">
              $50.00
            </div>
          </div>
          <div className="product-description__button">
            <button>Add to cart</button>
          </div>
          <div className="product-description__contents">
            <span>
              Find stunning women's cocktail dresses and party dresses. Stand
              out in lace and metallic cocktail dresses and party dresses from
              all your favorite brands.
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDescription;
