"use client";

import { getMenu, getProduct, getProducts } from "./lib/shopify";

import { useEffect, useState } from "react";
import { useCart } from "./hooks/useCart";
import { createCartAndSetCookie } from "./components/Cart/actions";
import { AddToCart } from "./components/Cart/AddToCart";
import { Product } from "./lib/shopify/types";
// import { useTest } from "./hooks/useTest";
// import { SlowBuffer } from "buffer";

export default function Home() {
  const { cart } = useCart();
  const [product, setProduct] = useState<Product | undefined>({
    variants: [],
    availableForSale: false,
  });

  useEffect(() => {
    if (!cart) {
      console.log("creating cart");
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    getProduct("test_product_2").then((product) => {
      setProduct(product);
    });
  }, []);

  return (
    <>
      <AddToCart product={product} />
      <button onClick={() => console.log(cart)}>cart</button>
      <div>{cart.totalQuantity}</div>
      {/* <div style={{ color: "red" }}>{cart2?.totalQuantity}</div> */}
      {/* <div>{cart?.totalQuantity}</div> */}
    </>
  );
}

// import { useOptimistic, useState, useRef } from "react";
// import { deliverMessage } from "./lib/utils";

// function Thread({ messages, sendMessage }) {
//   const formRef = useRef();

//   async function formAction(formData) {
//     addOptimisticMessage(formData.get("message"));
//     formRef.current.reset();
//     await sendMessage(formData);
//   }

//   const [optimisticMessages, addOptimisticMessage] = useOptimistic(
//     messages,
//     (state, newMessage) => [
//       ...state,
//       {
//         text: newMessage,
//         sending: true,
//       },
//     ]
//   );

//   return (
//     <>
//       {optimisticMessages.map((message, index) => (
//         <div key={index}>
//           {message.text}
//           {!!message.sending && <small> (Sending...)</small>}
//         </div>
//       ))}
//       <form action={formAction} ref={formRef}>
//         <input type="text" name="message" placeholder="Hello!" />
//         <button type="submit">Send</button>
//       </form>
//     </>
//   );
// }

// export default function App() {
//   const [messages, setMessages] = useState([
//     { text: "Hello there!", sending: false, key: 1 },
//   ]);

//   console.log(messages);

//   async function sendMessage(formData) {
//     const sentMessage = await deliverMessage(formData.get("message"));
//     setMessages((messages) => [...messages, { text: sentMessage }]);
//   }

//   return <Thread messages={messages} sendMessage={sendMessage} />;
// }
