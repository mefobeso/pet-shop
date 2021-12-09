import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Headerwhite from "../layouts/Header_white";
import Footerwhite from "../layouts/Footer_white";
import Product from "./Product";
import ProductButton from "./ProductButton";
import ProductPage from "./ProductPage";
import "./sass/css/product.css";
import { dataProducts } from "../../database/product.data";
import { useHistory } from "react-router-dom";
export default function ProductList() {
  // Variable
  const params = useParams();
  const title = params.category.toUpperCase();
  const history = useHistory();
  // State
  const [key, setKey] = useState();
  const [isGrid, setIsGrid] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState();

  // Data
  // State
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState();
  // useEffect
  useEffect(() => {
    setPageCount(Math.round(data.length / 8));
  }, [data.length]);

  useEffect(() => {
    var cateFilter = dataProducts;

    if (params.category === "all product") {
      setData(cateFilter);
    } else {
      cateFilter = dataProducts.filter((p) => p.category === params.category);
      setData(cateFilter);
    }
    if (filter === 50) {
      setData(cateFilter);
    }
    if (filter === 30) {
      setData(cateFilter.filter((p) => p.price >= 30 && p.price < 50));
    }
    if (filter === 10) {
      setData(cateFilter.filter((p) => p.price > 10 && p.price < 30));
    }
    if (filter === 1) {
      setData(cateFilter.filter((p) => p.price > 0 && p.price < 10));
    }
  }, [params.category, filter]);
  const pageChanger = (page) => {
    history.replace(`/home/product/category=${params.category} page=${page}`);
  };
  const viewGrid = () => {
    setIsGrid(true);
  };
  const viewList = () => {
    setIsGrid(false);
  };
  const onIconClick = () => {
    setIsFilter(!isFilter);
  };
  const onFilterSubmit = (filter) => {
    setFilter(filter);
    setKey(Math.random());
  };
  return (
    <>
      <Headerwhite />
      <div className="productlist">
        <h2>{title}</h2>
        <h6>What are you looking for ?</h6>
        <ProductButton
          viewGrid={viewGrid}
          viewList={viewList}
          isGrid={isGrid}
          isFilter={isFilter}
          onIconClick={onIconClick}
          onFilterSubmit={onFilterSubmit}
        ></ProductButton>
        <div
          className={`product-container
           ${isGrid ? " grid" : "list"}`}
        >
          <Product
            isGrid={isGrid}
            data={data}
            key={key}
            currentPage={params.page}
          ></Product>
        </div>
        <ProductPage
          pageCount={pageCount}
          currentPage={params.page}
          pageChanger={pageChanger}
        />
      </div>
      <Footerwhite />
    </>
  );
}
