// import { redirectToCheckout } from "@/app/components/Cart/actions";
// import { AddToCart } from "@/app/components/Cart/AddToCart";
// import { getProduct } from "@/app/lib/shopify";
// import Image from "next/image";

// export default async function ProductPage({
//   params,
// }: {
//   params: { handle: string };
// }) {
//   const { handle } = await params;
//   const product = await getProduct(handle);

//   return (
//     <div
//       style={{
//         paddingTop: "200px",
//         backgroundColor: "black",
//         minHeight: "100vh",
//         color: "white",
//       }}
//     >
//       {product.variants.map((variant, idx) => (
//         <div key={idx}>
//           <div>{`${variant.title} - $${Math.round(Number(variant.price.amount))}`}</div>
//           <Image src={variant.image.url} alt="" width={100} height={100} />
//         </div>
//       ))}

//       <AddToCart product={product} />
//       <form action={redirectToCheckout}>
//         <button>Checkout</button>
//       </form>
//     </div>
//   );
// }
