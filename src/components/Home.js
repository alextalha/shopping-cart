import React from 'react';
import { CartState } from '../context/Context';
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import './style.css';

const Home = () => {

  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState()

  const transformProducts = () => {

    let sortedProducts = products;

    console.log(sortedProducts);

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      )
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock)
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.byFastDelivery)
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.ratings <= byRating)
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }


    return sortedProducts;

  }

  return (

    <div className="home">
      <Filters />
      <div className="productContainer">
        {
          transformProducts().map((product) => (
            <SingleProduct product={product} key={product.id} />
          )
          )
        }

      </div>
    </div>
  )
};

export default Home;
