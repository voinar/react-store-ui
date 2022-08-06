import React from 'react';
import ProductListingCard from '../../components/ProductListingCard'
import { data } from '../../data/data.js'

import { ApolloProvider, Query } from '@apollo/client'
import { GET_PRODUCTS } from '../../graphql/Queries';

// const { error, loading, data } = useQuery(GET_PRODUCTS)

// const ProductsList = data.map((obj) => <ProductListingCard name={obj.name} img={obj.img} key={obj.count} />)
const ProductsList = data.map((obj) => <ProductListingCard {...obj} key={obj.count} />)

class ProductListing extends React.Component {
    render()
       {
        return <div className="product-listing section-container">
            <header>
                <h1>Category name</h1>
            </header>
            <div className="test">
            {/* <h1>{data[0].name}</h1> */}
            {/* {names} */}
                {/* <Welcome name={data[0].name} /> */}
                {/* <Welcome name="Cahal" /> */}
                {/* <Welcome name="Edite" /> */}
            </div>
            <div className="product-listing__cards-container">
                {/* <ProductListingCard name={data.name} /> */}
                {ProductsList}
            </div>
            <Query query={GET_PRODUCTS}>

            </Query>
        </div>
    }
}

export default ProductListing