import React, { useContext } from "react";
import { PRODUCTS } from "../../products";
import { ShopContext } from "../../context/shop-context"
import styles from '../cart/cart.module.css';
import { Trash } from "phosphor-react";
import Link from 'next/link';
import Image from 'next/image';


// component renders to show cart items & manages cart interactions
export default function Cart() {
  const { cartItems, clearCart, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  return (
    <div className={styles.cart}>
      <div>
        <h1 className="text-4xl font-bold text-black-500 mt-9">Shopping bag</h1>
      </div>

      <div className="flex justify-between">
        <Link href="/shop">
          <button className="bg-gray-200 text-black-800 px-3 py-1 rounded w-auto mt-2">
            Return to shop
          </button>
        </Link>

        {/* clear cart button, only shows when totalAmount is greater than 0 */}        {totalAmount > 0 && (
          <button className="bg-gray-200 text-black-800 px-3 py-1 rounded w-auto mt-2" onClick={clearCart}>
            Clear bag
          </button>
        )}
      </div>

      {/* if bag is not empty show total & button, else show empty msg */}
      {totalAmount > 0 ? (
        <div className="flex justify-end">
          <div className="flex flex-col items-end">
            <p className="text-xl font-bold mt-5">Total: £{totalAmount.toLocaleString()}</p>
            <button className="bg-blue-200 text-black-800 px-3 py-1 rounded w-auto mt-2">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-60">
          <h1 className="text-2xl text-center">Your bag is empty</h1>
        </div>
      )}

      {/* populate products in the shopping bag */}
      <div className={styles.cartItems}>
        {totalAmount > 0 ? (
          PRODUCTS.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CartItem key={product.id} data={product} />;
            }
          })
        ) : (
          ""
        )}
      </div>
    </div>
  );
}


// template for displaying the products in the shopping bag
 const CartItem = (props) => {
  const { id, name, price, image } = props.data;
  const { cartItems, addToCart, removeFromCart, removeAllFromCart } = useContext(ShopContext)

  return (
  <div className={styles.cartItem}>
  <Image src={image} alt={name} height={200} className={styles.productImage} />
  
  <div className={styles.description}>
      <p><b> {name} </b></p>
      <p>Item cost: £{price}</p>
      <div>Quantity: {cartItems[id]}</div>

      <button className="bg-gray-200 text-black-800 px-3 py-0 mt-1 rounded transform scale-90" onClick={() => addToCart(id)}> Add + </button>
      {" "}
      <button className="bg-gray-200 text-black-800 px-3 py-0 rounded mt-1 transform scale-90" onClick={() => removeFromCart(id)}> Remove - </button>

    <div className="mt-2">
      <button onClick={() => removeAllFromCart(id)} className="transform scale-90">
      <Trash size={32} /> </button>
    </div>
  </div>

  </div>    
  )
}