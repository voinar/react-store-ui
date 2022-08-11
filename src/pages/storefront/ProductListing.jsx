import React from 'react';
import ProductCard from '../../components/ProductCard'
// import { data } from '../../data/data.js'
import Products from '../../graphql/utils/Products'

// const ProductsListLocalData = data.map((obj) => <ProductCard {...obj} key={obj.count} />)

class ProductListing extends React.Component {
    render()
       {
        return <div className="product-listing section-container">
            <header>
                <h1>Category name</h1>
            </header>
            <div className="product-listing__cards-container">
                {/* <ProductCard name={data.name} /> */}
                {/* {ProductsListLocalData} */}
                <Products />
            </div>
        </div>
    }
}

export default ProductListing