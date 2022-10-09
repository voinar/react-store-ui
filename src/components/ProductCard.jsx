import React from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';

import ProductCartAdd from '../assets/icon_add-to-cart.svg';

class ProductCard extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <div className="product-card" key={this.props.id}>
        <Link to={`/product/${this.props.productUrl}`}>
          <img
            src={this.props.image}
            alt={`${this.props.brand} ${this.props.name}`}
            title={`${this.props.brand} ${this.props.name}`}
          />
          <div className="product-card__content">
            <h2 className="product-card__content-title">
              {this.props.brand} {this.props.name}
            </h2>
            <span className="product-card__content-price">
              {this.props.priceSymbol}
              {this.props.priceAmount}
            </span>
          </div>
        </Link>
        {this.props.inStock ? (
          this.props.selectableAttributes ? (
            <>
              {/* <Link to={`/product/${this.props.productUrl}`}> */}
                <div
                  className="product-card__cart-add"
                  onClick={() => this.context.addToCartFromPLP(this.props.id)}
                >
                  <img src={ProductCartAdd} alt="add product to cart" />
                </div>
              {/* </Link> */}
            </>
          ) : (
            <>
              <div
                className="product-card__cart-add"
                onClick={() => this.context.addToCartFromPLP(this.props.id)}
              >
                <img src={ProductCartAdd} alt="add product to cart" />
              </div>
            </>
          )
        ) : null}

        <Link to={`/product/${this.props.productUrl}`}>
          <div
            className={
              this.props.inStock ? '' : `${'product-card__out-of-stock'}`
            }
          >
            {this.props.inStock ? '' : <span>Out of stock</span>}
          </div>
        </Link>
      </div>
    );
  }
}

export default ProductCard;
