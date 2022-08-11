import React from 'react';

import { GET_CATEGORIES } from '../graphql/Queries';

class ProductCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            categories: null,
          };
    }

    componentDidMount() {
      this.renderCategories();
    }

    componentDidUpdate() {
      this.renderCategories();
    }

    renderCategories = async () => {
      try {
        const res = await GET_CATEGORIES;
        const data = await res.json();

        this.setState({
          categories: data.data,
          loading: false
        });

      } catch (err) {
        console.log(err);
      }
    };

    componentDidUpdate() {
        this.renderCategories();
      }

    render() {
      // console.log(this.state)

      const { categories } = this.state || null;
      // console.log(data);
      return (
        <>
          <div>
            {this.state.loading || !this.state.categories ? (
              <div>loading...</div>
            ) : (
              <div>
                {/* {this.state.data.categories[0].name}&nbsp; */}
                {/* {this.state.data.categories[0].products[0].id} */}
                <ul className="navbar-categories">

                {categories.categories.map((obj) => {
                  return (
                    <li key={obj.name}>{obj.name}</li>
                  );
                })}
                </ul>
              </div>
            )}
          </div>
        </>
      );
    }
  }

  export default ProductCategories;