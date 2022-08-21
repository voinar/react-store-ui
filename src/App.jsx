import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import { GET_CATEGORIES } from "./graphql/Queries";

import "./styles/style.css";

import Navbar from "./components/Navbar";
import ProductListing from "./pages/storefront/ProductListing";
import ProductDescription from "./pages/storefront/ProductDescription";
import Cart from "./pages/storefront/Cart";
import Counter from "./components/Counter";

import context from "./context/AppContext";
import AppContext, { AppProvider } from "./context/AppContext";

class App extends React.Component {
  state = {
    loading: true,
    categories: {
      categories: [],
    },
    categoryIndex: 0,
  };

  getCategories = async () => {
    try {
      const query = await axios({
        url: "http://localhost:4000",
        method: "POST",
        data: {
          query: `
          query GET_CATEGORIES {
            categories {
              name
            }
          }
          `,
        },
      }).then((result) => {
        // console.log(result.data.data)
        this.setState({
          loading: false,
          categories: result.data.data,
        });
      });
      // });
    } catch (err) {
      console.log(err);
    }
    // console.log(this.state.categories)
  };

  // getCategories = async () => {
  //   try {
  //     const res = await GET_CATEGORIES;
  //     const data = await res.clone().json();
  //     this.setState({
  //       loading: false,
  //       categories: data.data,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   // console.log('getCategories' + JSON.stringify(this.state.categories));
  // };

  render() {
    // const { categories } = this.state || null;
    // console.log(JSON.stringify(this.state.categories));
    return (
      <>
        <AppProvider>
          <BrowserRouter>
            <Navbar
              toggleCartOverlay={this.toggleCartOverlay}
              cartOverlayVisibility={this.state.cartOverlayVisibility}
              onClick={this.toggleCartOverlay}
              currency={this.state.currency}
              handleCurrencyChange={this.handleCurrencyChange}
              loadProducts={this.loadProducts}
              categories={this.state.categories}
              loading={this.state.loading}
            />
            {/* <Counter /> */}
            <Routes>
              <Route
                path="/"
                element={
                  <ProductListing
                    category={""}
                    categoryIndex={this.state.categoryIndex}
                    loadProducts={this.loadProducts}
                  />
                }
              />
              {this.state.categories.categories.map((obj) => {
                return (
                  <Route
                    key={`${obj.name}`}
                    path={`${obj.name}`}
                    element={
                      <ProductListing
                        category={`${obj.name}`}
                        categoryIndex={this.state.categoryIndex}
                      />
                    }
                  />
                );
              })}
              {/* <Route
              path="/product/description"
              element={<ProductDescription />}
            /> */}
              <Route
                path="/product/:productId"
                element={<ProductDescription />}
              />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            {/* <div>
          {this.state.loading || !this.state.categories ? (
            <div>loading...</div>
          ) : (
            <div>
              <ul>
                {categories.categories.map(obj => {
                  return (
                      <li key={obj.name}>{obj.name}</li>
                  );
                })}
              </ul>
            </div>
          )}
        </div> */}
          </BrowserRouter>
        </AppProvider>
      </>
    );
  }

  componentDidMount() {
    this.getCategories();
  }

  loadProducts = (e) => {
    const categoryIndex = this.state.categories.categories
      .map((category) => category.name)
      .indexOf(e.target.textContent);
    // .indexOf((window.location.pathname).substring(1));
    this.setState({ categoryIndex: categoryIndex });
  };
}

App.contextType = AppContext;

export default App;
