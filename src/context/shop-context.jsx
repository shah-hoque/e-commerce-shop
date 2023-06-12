import React, { createContext, useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { PRODUCTS } from "../products";

// new context to store and share shopping data
export const ShopContext = createContext(null);

// shopping bag stored as: product id : quantity
const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

// provides all state and funcs about shopping bag to ShopContext
export const ShopContextProvider = ({ user, children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [cartLoaded, setCartLoaded] = useState(false);
  const cartItemsRef = useRef(cartItems); // a ref to hold the cartItems state
  const saveTimeoutRef = useRef(); // ref to hold the timeout for saving bag

  // updates the ref when cartItems state changes or the user prop changes. Saves cart to Firestore db
  useEffect(() => {
    cartItemsRef.current = cartItems;

    if (user && cartLoaded) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(async () => {
        await setDoc(doc(db, 'shoppingLists', user.uid), {
          cart: cartItemsRef.current,
        });
      }, 200);
    }

    return () => clearTimeout(saveTimeoutRef.current);
  }, [cartItems, user, cartLoaded]);


  // load cart from Firestore db when user logs in
  useEffect(() => {
    if (user) {
      const loadCart = async () => {
        // get reference to user's doc in Firestore db
        const docRef = doc(db, 'shoppingLists', user.uid);
        // get the actual doc
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let serverCart = docSnap.data().cart;
          let localCart = cartItemsRef.current;
          let mergedCart = {...localCart};
          
          // merge the server cart into the merged cart
          for(let item in serverCart){
            if(mergedCart[item]){
              mergedCart[item] += serverCart[item];
            } else {
              mergedCart[item] = serverCart[item];
            }
          }

          setCartItems(mergedCart);
          // set to true after cart is loaded from Firestore (db)
          setCartLoaded(true);
        } else {
          setCartItems(getDefaultCart());
        }
      }
      loadCart();
    }
  }, [user]);

  // calculate the total price of items in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // find the matching product in the PRODUCTS array by its id	
        let itemInfo = PRODUCTS.find(product => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price
      }
    }
    return totalAmount;
  }

  // func decreases the quantity of a product in the cart by one
  const addToCart = (itemID) => {
    setCartItems((prev) => ({...prev, [itemID]: prev[itemID] + 1 }))
  };

  // func decreases the quantity of a product in the cart by one
  const removeFromCart = (itemID) => {
    setCartItems((prev) => ({...prev, [itemID]: prev[itemID] - 1 }))
  };

  // func removes all quantities of a product from the cart	
  const removeAllFromCart = (itemID) => {
    setCartItems((prev) => ({...prev, [itemID]: 0 }))
  };

  // func resets the entire cart to the default state	
  const clearCart = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {cartItems, addToCart, removeFromCart, removeAllFromCart, clearCart, getTotalCartAmount};

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};