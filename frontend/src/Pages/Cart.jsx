import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/cartSlice";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="pt-20 max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 mb-4 rounded-xl shadow"
            >
              <img src={item.images[0]} className="h-16" />

              <div className="flex-1 ml-4">
                <h2 className="font-bold">{item.title}</h2>
                <p>${item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6 font-bold text-xl">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}