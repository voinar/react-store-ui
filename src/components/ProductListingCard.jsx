import React from 'react';
import ProductImage from '../assets/product-image.png';
import ProductCartAdd from '../assets/icon_add-to-cart.svg';

class ProductListingCard extends React.Component {
    render() {
        return <>
        <div className="product-listing-card">
            <img src={ProductImage} alt="product image" />
            <div className="product-listing__content">
                <h2 className="product-listing__content-title">Apollo Running Short</h2>
                <span className="product-listing__content-price">$50.00</span>
            </div>
            <div className="product-listing__cart-add">
                <img src={ProductCartAdd} alt="add product to cart" />
            </div>
            <div className="product-listing__out-of-stock">
                <span>Out of stock</span>
            </div>
        </div>
        </>
    }
}

export default ProductListingCard;