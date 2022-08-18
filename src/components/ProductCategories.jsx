import React from "react";

import { GET_CATEGORIES } from "../graphql/Queries";
import { Link } from "react-router-dom";

class ProductCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categories: null,
    };
  }

  renderCategories = async () => {
    try {
      const res = await GET_CATEGORIES;
      const data = await res.clone().json();

      this.setState({
        loading: false,
        categories: data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { categories } = this.state || null;
    // console.log(categories);
    return (
      <>
        <div>
          {this.state.loading || !this.state.categories ? (
            <div>loading...</div>
          ) : (
            <div>
              <ul className="navbar-categories">
                {categories.categories.map((obj) => {
                  return (
                    <Link key={obj.name} to={`${obj.name}`}>
                      <li onClick={this.props.loadProducts}>{obj.name}</li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }

  componentDidMount() {
    this.renderCategories();
  }

  // componentDidUpdate() {
  //   this.renderCategories();
  // }
}

export default ProductCategories;
