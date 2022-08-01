import React from 'react';
import ProductListingCard from '../../components/ProductListingCard'

class ProductListing extends React.Component {
    render() {
        return <div className="product-listing section-container">
            <header>
                <h1>Category name</h1>
            </header>
            <div className="product-listing__cards-container">
                <ProductListingCard />
                <ProductListingCard />
                <ProductListingCard />
                <ProductListingCard />
                <ProductListingCard />
                <ProductListingCard />
                <ProductListingCard />
                <ProductListingCard />
            </div>
        </div>
    }
}

export default ProductListing