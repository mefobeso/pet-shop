import React, { useState, useRef } from "react";
import { useEffect } from "react/cjs/react.development";

export default function CartQuantity(props) {
  useEffect(() => {
    setSelectedQuantity(props.amount);
  }, []);

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    props.onAmountChange(selectedQuantity);
  }, [selectedQuantity]);
  const quantityChangeHandler = (event) => {
    if (selectedQuantity < props.maxQuantity) {
      setSelectedQuantity(() => {
        setSelectedQuantity(selectedQuantity);
      });
      console.log(selectedQuantity);
    }
    return;
  };
  const minusHandler = () => {
    setSelectedQuantity(() => onMinus());
  };
  const plusHandler = () => {
    if (selectedQuantity < props.maxQuantity) {
      setSelectedQuantity(selectedQuantity + 1);
    } else {
      return;
    }
  };
  const onMinus = () => {
    if (selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1);
    } else {
      return;
    }
  };
  return (
    <div>
      <input
        type="button"
        value="-"
        data-field="quantity"
        onClick={minusHandler}
      />
      <input
        type="number"
        step="1"
        max={props.maxQuantity}
        min="0"
        value={selectedQuantity}
        onChange={quantityChangeHandler}
        name="quantity"
      />
      <input
        type="button"
        value="+"
        data-field="quantity"
        onClick={plusHandler}
      />
    </div>
  );
}
