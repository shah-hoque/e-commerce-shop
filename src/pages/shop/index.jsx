import { PRODUCTS } from "../../products";
import { CaretDown } from "phosphor-react";
import { ShopContext } from "../../context/shop-context"
import React, { useContext } from "react";
import styles from '../shop/shop.module.css';
import Image from 'next/image';


// component renders to show hero banner and shop
export default function Shop() {

  return (
    <div className={styles.shop}>

      <div className={styles.heroBanner}>


      <div className="absolute inset-0 flex flex-col items-center justify-between">
        <div className="flex-grow" />
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-white text-7xl md:text-9xl">born to fly</h1>
          <h1 className="text-white text-2xl md:text-4xl">Discover the skies with DJI</h1>
        </div>
        <div className="flex-grow" />
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-white text-2xl md:text-1xl">Shop</h2>
          <CaretDown className="text-white w-8 h-8" />
        </div>
      </div>
    </div>

      <div className={styles.shopTitle}>
        <h1 className="text-4xl font-bold text-black-500">Accessories</h1>
      </div>
      {/* display products */}
      <div className={styles.products}>
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>

  );
}


// template for displaying the products in the shop
const Product = (props) => {
  const { id, name, price, image } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext)

  // get the current quantity of this product in the cart
  const cartItemAmount = cartItems[id]

  return (
    <div className={styles.product}>
      <Image src={image} alt={name} height={200} className={styles.productImage} />

      <div className={styles.description}>
        <p> <b>{name}</b> </p>
        <p> £{price} </p>
      </div>

      <button className="bg-gray-200 text-black-800 px-3 py-1 rounded w-auto mt-2" onClick={() => addToCart(id)}> Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
      </button>

    </div>
  );
};