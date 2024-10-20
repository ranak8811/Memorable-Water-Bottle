import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css";
import {
  addToLS,
  getStoredCart,
  removeFromLS,
} from "../../Utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("bottles.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);

  // load cart from local storage
  useEffect(() => {
    console.log("called the ls useEffect", bottles.length);
    if (bottles.length > 0) {
      const storedCart = getStoredCart();
      //   console.log(storedCart, bottles);
      const savedCart = [];
      for (const id of storedCart) {
        console.log(id);
        const bottle = bottles.find((bottle) => bottle.id === id);
        if (bottle) {
          savedCart.push(bottle);
        }
      }
      console.log("saved cart: ", savedCart);
      setCart(savedCart);
    }
  }, [bottles]);

  const handleAddToCart = (bottle) => {
    // console.log("bottle going to add to cart");
    // console.log(bottle);
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLS(bottle.id);
  };

  const handleRemoveFromCart = (id) => {
    /**
     * 1. remove from visual cart
     * 2. remove form local storage
     */

    // 1 number
    const remainingCart = cart.filter((bottle) => bottle.id !== id);
    setCart(remainingCart);

    // 2 number
    removeFromLS(id);
  };

  return (
    <div>
      <h3>Bottles Available: {bottles.length}</h3>
      {/* <h4>Cart: {cart.length}</h4> */}
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
      <div className="bottle-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={handleAddToCart}
          ></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
