import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_PRODUCTS } from "../../graphql/Queries";



const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: true,
    categories: null,
  },
  reducers: {
    loadProducts: (state) => {
      state.loading = false
      state.data = createAsyncThunk('fetch', async () => {
        try {
          const res = await GET_PRODUCTS;
          const data = await res.clone().json();
        } catch (err) {
          console.log(err);
        }
      });
    },
  },
});

console.log("reducer loaded");

export const { loadProducts } = productsSlice.actions;

export default productsSlice.reducer;
