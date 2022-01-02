import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./CartButton.module.css";
export default function CartButton(props) {
  const addedProduct = props.addedProduct;
  const product = props.product;
  const setAddedProduct = props.setAddedProduct;
  console.log(product);
  const addItemHandler = () => {
    setAddedProduct((prevProductList) => {
      console.log(props.addedProduct);
      if (addedProduct != null) {
        const duplicate = addedProduct.find((p) => p._id === product._id);
        if (duplicate) {
          const index = addedProduct.findIndex((p) => p._id === product._id);
          addedProduct[index].amount += 1;
          localStorage.setItem("cart", JSON.stringify(addedProduct));
          return addedProduct;
        }
        return [
          ...prevProductList,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            img: product.img,
            amount: +1,
          },
        ];
      }
      return [
        ...prevProductList,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          img: product.img,
          amount: +1,
        },
      ];
    });
  };
  return (
    <button className={classes.cart} onClick={addItemHandler}>
      <FontAwesomeIcon icon="cart-plus" />
    </button>
  );
}
