import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import AppContext from "../context/AppContext";

// const data = [
//   {
//     cartItemId: "aaaaaa-e72-c132-d2cd-ba135cbdbb",
//     id: "huarache-x-stussy-le",
//     name: "Nike Air Huarache Le",
//     inStock: true,
//     gallery: [
//       "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
//       "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
//       "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
//       "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
//       "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
//     ],
//     brand: "Nike x Stussy",
//     prices: [
//       { currency: { label: "USD", symbol: "$" }, amount: 144.69 },
//       { currency: { label: "GBP", symbol: "£" }, amount: 104 },
//       { currency: { label: "AUD", symbol: "A$" }, amount: 186.65 },
//       { currency: { label: "JPY", symbol: "¥" }, amount: 15625.24 },
//       { currency: { label: "RUB", symbol: "₽" }, amount: 10941.76 },
//     ],
//     attributes: [
//       {
//         id: "Size",
//         name: "Size",
//         type: "text",
//         items: [
//           { displayValue: "40", value: "40", id: "40" },
//           { displayValue: "41", value: "41", id: "41" },
//           { displayValue: "42", value: "42", id: "42" },
//           { displayValue: "43", value: "43", id: "43" },
//         ],
//       },
//     ],
//     description: "<p>Great sneakers for everyday use!</p>",
//     category: "clothes",
//     quantity: 1,
//     attributesSelected: {
//       attributeSelectedColor: "",
//       attributeSelectedSize: "42",
//       attributeSelectedCapacity: "",
//     },
//   },
//   {
//     cartItemId: "215552-e72-c132-d2cd-ba135cbdbb",
//     id: "huarache-x-stussy-le",
//     name: "Nike Air Huarache Le",
//     inStock: true,
//     gallery: [
//       "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
//       "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
//       "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
//       "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
//       "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
//     ],
//     brand: "Nike x Stussy",
//     prices: [
//       { currency: { label: "USD", symbol: "$" }, amount: 144.69 },
//       { currency: { label: "GBP", symbol: "£" }, amount: 104 },
//       { currency: { label: "AUD", symbol: "A$" }, amount: 186.65 },
//       { currency: { label: "JPY", symbol: "¥" }, amount: 15625.24 },
//       { currency: { label: "RUB", symbol: "₽" }, amount: 10941.76 },
//     ],
//     attributes: [
//       {
//         id: "Size",
//         name: "Size",
//         type: "text",
//         items: [
//           { displayValue: "40", value: "40", id: "40" },
//           { displayValue: "41", value: "41", id: "41" },
//           { displayValue: "42", value: "42", id: "42" },
//           { displayValue: "43", value: "43", id: "43" },
//         ],
//       },
//     ],
//     description: "<p>Great sneakers for everyday use!</p>",
//     category: "clothes",
//     quantity: 1,
//     attributesSelected: {
//       attributeSelectedColor: "",
//       attributeSelectedSize: "42",
//       attributeSelectedCapacity: "",
//     },
//   },
//   {
//     cartItemId: "7c27242-2fde-c426-820a-da72b4f5153",
//     id: "ps-5",
//     name: "PlayStation 5",
//     inStock: false,
//     gallery: [
//       "https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg",
//       "https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg",
//       "https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg",
//       "https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg",
//       "https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg",
//     ],
//     brand: "Sony",
//     prices: [
//       { currency: { label: "USD", symbol: "$" }, amount: 844.02 },
//       { currency: { label: "GBP", symbol: "£" }, amount: 606.67 },
//       { currency: { label: "AUD", symbol: "A$" }, amount: 1088.79 },
//       { currency: { label: "JPY", symbol: "¥" }, amount: 91147.25 },
//       { currency: { label: "RUB", symbol: "₽" }, amount: 63826.91 },
//     ],
//     attributes: [
//       {
//         id: "Color",
//         name: "Color",
//         type: "swatch",
//         items: [
//           { displayValue: "Green", value: "#44FF03", id: "Green" },
//           { displayValue: "Cyan", value: "#03FFF7", id: "Cyan" },
//           { displayValue: "Blue", value: "#030BFF", id: "Blue" },
//           { displayValue: "Black", value: "#000000", id: "Black" },
//           { displayValue: "White", value: "#FFFFFF", id: "White" },
//         ],
//       },
//       {
//         id: "Capacity",
//         name: "Capacity",
//         type: "text",
//         items: [
//           { displayValue: "512G", value: "512G", id: "512G" },
//           { displayValue: "1T", value: "1T", id: "1T" },
//         ],
//       },
//     ],
//     description:
//       "<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>",
//     category: "tech",
//     quantity: 1,
//     attributesSelected: {
//       attributeSelectedColor: "#000000",
//       attributeSelectedSize: "",
//       attributeSelectedCapacity: "1T",
//     },
//   },
//   {
//     cartItemId: "07e53d-701-b0d1-cc24-35f1d0c7caec",
//     id: "apple-airtag",
//     name: "AirTag",
//     inStock: true,
//     gallery: [
//       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000",
//     ],
//     brand: "Apple",
//     prices: [
//       { currency: { label: "USD", symbol: "$" }, amount: 120.57 },
//       { currency: { label: "GBP", symbol: "£" }, amount: 86.67 },
//       { currency: { label: "AUD", symbol: "A$" }, amount: 155.54 },
//       { currency: { label: "JPY", symbol: "¥" }, amount: 13021.04 },
//       { currency: { label: "RUB", symbol: "₽" }, amount: 9118.13 },
//     ],
//     attributes: [],
//     description:
//       "\n<h1>Lose your knack for losing things.</h1>\n<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>\n",
//     category: "tech",
//     quantity: 1,
//     attributesSelected: {
//       attributeSelectedColor: "",
//       attributeSelectedSize: "",
//       attributeSelectedCapacity: "",
//     },
//   },
// ];

// const countsByCs = {};
// data.forEach(({ id }) => {
//   countsByCs[id] = (countsByCs[id] || 0) + 1;
// });
// const finalArray = Object.entries(countsByCs)
//   .map(([id, count]) => ({ id, count }))
//   // .sort((a, b) => b.count - a.count);

// console.log('reduced: ' + JSON.stringify(finalArray));

class CartOverlay extends React.Component {
  static contextType = AppContext;

  render() {
    // {console.log(this.productCartContents.map(item => item.props.productDetails.attributesSelected))}
    // {console.log(this.productCartContents.reduce((total, item) => {
    //   return total + item.props.productDetails.prices[0].amount}, 0))}
    // {console.log('reduced ')}

    return (
      <div className="cart-overlay" ref={this.outsideRef}>
        <div className="cart-overlay__items-container">
          <div className="cart-overlay__header">
            <h3>My Bag,</h3>
            <span>{this.context.productCartContents.length} items</span>
          </div>

          {this.context.productCartContents.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.cartItemId}
                productId={cartItem.id} //id used to query graphql for product details
                productDetails={cartItem}
                attributeSelectedColor={
                  cartItem.attributesSelected.attributeSelectedColor
                }
                attributeSelectedSize={
                  cartItem.attributesSelected.attributeSelectedSize
                }
                attributeSelectedCapacity={
                  cartItem.attributesSelected.attributeSelectedCapacity
                }
                // duplicateItemCount={1}
              />
            );
          })}

          <div className="cart-overlay__summary">
            <div className="cart-overlay__summary__total">
              <h3>Total</h3>
              <span>
                {this.context.currency}
                {this.context.cartTotal()}
              </span>
            </div>
            <div className="cart-overlay__summary__buttons">
              <Link to="/cart">
                <button
                  className="cart-overlay__summary__view-bag"
                  onClick={this.context.toggleModalOverlayMask}
                >
                  View bag
                </button>
              </Link>
              <button
                className="cart-overlay__summary__checkout"
                onClick={this.context.toggleModalOverlayMask}
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  outsideRef = React.createRef();

  handleClickOutside = (e) => {
    if (!this.outsideRef.current.contains(e.target)) {
      this.context.toggleModalOverlayMask();
    }
  };
}

export default CartOverlay;
