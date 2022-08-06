import React from "react";
import ProductImage from '../../assets/product-image.png'

class ProductDescription extends React.Component {
  render() {
    return (
      <div className="product-description section-container">
        <div className="product-description__images">
          <div className="product-description__images-small">
            <div className="product-description__image-small">
                <img src={ProductImage} alt='product'/>
            </div>
            <div className="product-description__image-small">
                <img src={ProductImage} alt='product'/>
            </div>
            <div className="product-description__image-small">
                <img src={ProductImage} alt='product'/>
            </div>
          </div>
          <div className="product-description__image-large">
                <img src={ProductImage} alt='product'/>
          </div>
        </div>
        <div className="product-description__attributes">
          <div className="product-description__attribute-name">
            <span>Apollo</span>
          </div>
          <div className="product-description__attribute-type">
            <span>Running Short</span>
          </div>
          <div className="product-description__attributes-select-size">
            <span className="product-description__attribute-category">Size:</span>
            <div className="product-description__attributes-select-size-options">
              <div className="product-description__attributes-size">XS</div>
              <div className="product-description__attributes-size">S</div>
              <div className="product-description__attributes-size">M</div>
              <div className="product-description__attributes-size">L</div>
            </div>
          </div>
          <div className="product-description__attributes-select-color">
            <span className="product-description__attribute-category">Color:</span>
            <div className="product-description__attributes-select-color-options">
              <div className="product-description__attributes-color">1</div>
              <div className="product-description__attributes-color">2</div>
              <div className="product-description__attributes-color">3</div>
            </div>
          </div>
          <div className="product-description__attributes-price">
            <span className="product-description__attribute-category">Price:</span>
            <span className="product-description__attributes-price-amount">
              $50.00
            </span>
          </div>
          <button className="product-description__button">
            Add to cart
          </button>
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
