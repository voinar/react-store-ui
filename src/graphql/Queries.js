import {gql} from '@apollo/client'

export const GET_PRODUCTS = gql`
    query GET_PRODUCTS {
        categories {
        name
        products {
            id
            name
            inStock
            gallery
            description
            category
            attributes {
            items {
                displayValue
                value
                id
            }
            }
            prices {
            currency {
                symbol
                label
            }
            amount
            }
            brand
        }
        }
        currencies {
        label
        symbol
        }
    }
`

export const GET_CURRENCIES = gql`
    currencies {
        label
        symbol
    }
`

