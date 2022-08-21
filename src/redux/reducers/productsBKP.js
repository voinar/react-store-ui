import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { userAPI } from './userAPI'

const initialState = {
  loading: true,
  categories: null,
  error: null,
  status: "idle",
  cool: true,
  products: {},
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios({
        url: "http://localhost:4000/",
        method: "POST",
        data: {
          query: `
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
                      type
                      name
                      id
                      items {
                        id
                        value
                        displayValue
                      }
                    }
                    brand
                    prices {
                      amount
                      currency {
                        label
                        symbol
                      }
                    }
                  }
                }
              }
              `,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
    // console.log('fetch successful')
    // console.log(this.props.category.indexOf(this.props.category))
  }
);

// Then, handle actions in your reducers:
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers(builder) {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        // Add products to the state array
        state.status = "success";
        state.products.push(action.payload);

        //   state.products.push(action);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
console.log(initialState);
// console.log(state);
export const loadedProducts = (state) => state.products;

export default productsSlice.reducer;
