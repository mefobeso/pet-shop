import React, { useEffect, useState } from "react";
import dataProducts from "../../database/product.data";
import "../FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Product() {
  const [addedProduct, setAddedProduct] = useState([]);
  const [favoriteProduct, setFavoriteProduct] = useState([]);
  useEffect(() => {
    console.log("effect");
    localStorage.setItem("cart", JSON.stringify(addedProduct));
    localStorage.setItem("favorite", JSON.stringify(favoriteProduct));
  }, [addedProduct,favoriteProduct]);
  return (
    <>
      {dataProducts.map((product, index) => {
        const addItemHandler = () => {
          setAddedProduct((prevProductList) => {
            if (addedProduct != null) {
              const duplicate = addedProduct.find((p) => p.id === product.id);
              if (duplicate) {
                const index = addedProduct.findIndex(
                  (p) => p.id === product.id
                );
                addedProduct[index].amount += 1;
                localStorage.setItem("cart", JSON.stringify(addedProduct));
                console.log(addedProduct[index]);
                console.log(addedProduct);
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
        const favoriteItemHandler = () => {
          setFavoriteProduct((prevProductList) => {
            if (favoriteProduct != null) {
              const duplicate = favoriteProduct.find(
                (p) => p.id === product.id
              );
              if (duplicate) {
                console.log("dup");
                return prevProductList;
              }
            }
            return [
              ...prevProductList,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                img: product.img,
              },
            ];
          });
        };
        return (
          <div className="product" key={index}>
            <img src={product.img} alt="" />
            <div className="product-info">
              <div className="">
                <h5>{product.name}</h5>
                <p style={{ fontWeight: "600" }}>${product.price}</p>
              </div>
              <div>
                <button onClick={favoriteItemHandler}>
                  <FontAwesomeIcon
                    icon="heart"
                    className="icon"
                    style={{ color: "red" }}
                  />
                </button>
                &nbsp;
                <button onClick={addItemHandler}>
                  <FontAwesomeIcon icon="cart-plus" className="icon" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
