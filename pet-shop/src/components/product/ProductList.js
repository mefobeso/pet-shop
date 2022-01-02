import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Headerwhite from "../layouts/Header_white";
import Footerwhite from "../layouts/Footer_white";
import Product from "./Product";
import ProductButton from "./ProductButton";
import ProductPage from "./ProductPage";
import "./sass/css/product.css";
import { dataProducts } from "../../database/product.data";
import axios from "axios";
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
  const [sort, setSort] = useState("");

  // State
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [pageCount, setPageCount] = useState();
  // Data
  // useEffect
  useEffect(() => {
    setPageCount(Math.round(data.length / 8));
  }, [data.length]);

  useEffect(async() => {
    const dataProducts = await axios.get("http://localhost:5000/products");
    var cateFilter = dataProducts.data.Products;
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

    if (sort === "az") {
      cateFilter.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
      setKey(Math.random());
    }
    if (sort === "low") {
      cateFilter.sort(function (a, b) {
        return a.price - b.price;
      });
      setKey(Math.random());
    }
    if (sort === "high") {
      cateFilter.sort(function (a, b) {
        return b.price - a.price;
      });
      setKey(Math.random());
    }
  }, [params.category, filter, sort]);

  // Funtion
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
  const onSortSelected = (sort) => {
    setSort(sort);
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
          onSortSelected={onSortSelected}
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
