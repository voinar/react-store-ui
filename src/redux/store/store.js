import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../reducers/counter"
import productReducer from "../reducers/products"

export default configureStore({
    reducer: {
        counter: counterReducer,
        products: productReducer,
    }
})