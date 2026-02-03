// import React, { useContext, useState, useEffect } from "react";
// import AppContext from "../Context/Context";
// import axios from "axios";
// import CheckoutPopup from "./CheckoutPopup";
// import { Button } from 'react-bootstrap';

// const Cart = () => {
//   const { cart, removeFromCart , clearCart } = useContext(AppContext);
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [cartImage, setCartImage] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchImagesAndUpdateCart = async () => {
//       console.log("Cart", cart);
//       try {
//         const response = await axios.get("http://localhost:8080/api/products");
//         const backendProductIds = response.data.map((product) => product.id);

//         const updatedCartItems = cart.filter((item) => backendProductIds.includes(item.id));
//         const cartItemsWithImages = await Promise.all(
//           updatedCartItems.map(async (item) => {
//             try {
//               const response = await axios.get(
//                 `http://localhost:8080/api/product/${item.id}/image`,
//                 { responseType: "blob" }
//               );
//               const imageFile = await converUrlToFile(response.data, response.data.imageName);
//               setCartImage(imageFile)
//               const imageUrl = URL.createObjectURL(response.data);
//               return { ...item, imageUrl };
//             } catch (error) {
//               console.error("Error fetching image:", error);
//               return { ...item, imageUrl: "placeholder-image-url" };
//             }
//           })
//         );
//         console.log("cart",cart)
//         setCartItems(cartItemsWithImages);
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       }
//     };

//     if (cart.length) {
//       fetchImagesAndUpdateCart();
//     }
//   }, [cart]);

//   useEffect(() => {
//     const total = cartItems.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );
//     setTotalPrice(total);
//   }, [cartItems]);

//   const converUrlToFile = async (blobData, fileName) => {
//     const file = new File([blobData], fileName, { type: blobData.type });
//     return file;
//   }

//   const handleIncreaseQuantity = (itemId) => {
//     const newCartItems = cartItems.map((item) => {
//       if (item.id === itemId) {
//         if (item.quantity < item.stockQuantity) {
//           return { ...item, quantity: item.quantity + 1 };
//         } else {
//           alert("Cannot add more than available stock");
//         }
//       }
//       return item;
//     });
//     setCartItems(newCartItems);
//   };
  

//   const handleDecreaseQuantity = (itemId) => {
//     const newCartItems = cartItems.map((item) =>
//       item.id === itemId
//         ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
//         : item
//     );
//     setCartItems(newCartItems);
//   };

//   const handleRemoveFromCart = (itemId) => {
//     removeFromCart(itemId);
//     const newCartItems = cartItems.filter((item) => item.id !== itemId);
//     setCartItems(newCartItems);
//   };

//   const handleCheckout = async () => {
//     try {
//       for (const item of cartItems) {
//         const { imageUrl, imageName, imageData, imageType, quantity, ...rest } = item;
//         const updatedStockQuantity = item.stockQuantity - item.quantity;
  
//         const updatedProductData = { ...rest, stockQuantity: updatedStockQuantity };
//         console.log("updated product data", updatedProductData)
  
//         const cartProduct = new FormData();
//         cartProduct.append("imageFile", cartImage);
//         cartProduct.append(
//           "product",
//           new Blob([JSON.stringify(updatedProductData)], { type: "application/json" })
//         );
  
//         await axios
//           .put(`http://localhost:8080/api/product/${item.id}`, cartProduct, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           })
//           .then((response) => {
//             console.log("Product updated successfully:", (cartProduct));
//           })
//           .catch((error) => {
//             console.error("Error updating product:", error);
//           });
//       }
//       clearCart();
//       setCartItems([]);
//       setShowModal(false);
//     } catch (error) {
//       console.log("error during checkout", error);
//     }
//   };

//   return (
//     <div className="cart-container">
//       <div className="shopping-cart">
//         <div className="title">Shopping Bag</div>
//         {cartItems.length === 0 ? (
//           <div className="empty" style={{ textAlign: "left", padding: "2rem" }}>
//             <h4>Your cart is empty</h4>
//           </div>
//         ) : (
//           <>
//             {cartItems.map((item) => (
//               <li key={item.id} className="cart-item">
//                 <div
//                   className="item"
//                   style={{ display: "flex", alignContent: "center" }}
//                   key={item.id}
//                 >
                 
//                   <div>
//                     <img
//                       src={item.imageUrl}
//                       alt={item.name}
//                       className="cart-item-image"
//                     />
//                   </div>
//                   <div className="description">
//                     <span>{item.brand}</span>
//                     <span>{item.name}</span>
//                   </div>

//                   <div className="quantity">
//                     <button
//                       className="plus-btn"
//                       type="button"
//                       name="button"
//                       onClick={() => handleIncreaseQuantity(item.id)}
//                     >
//                       <i className="bi bi-plus-square-fill"></i>
//                     </button>
//                     <input
//                       type="button"
//                       name="name"
//                       value={item.quantity}
//                       readOnly
//                     />
//                     <button
//                       className="minus-btn"
//                       type="button"
//                       name="button"
//                       onClick={() => handleDecreaseQuantity(item.id)}
//                     >
//                       <i className="bi bi-dash-square-fill"></i>
//                     </button>
//                   </div>

//                   <div className="total-price " style={{ textAlign: "center" }}>
//                     Rs {item.price * item.quantity}
//                   </div>
//                   <button
//                     className="remove-btn"
//                     onClick={() => handleRemoveFromCart(item.id)}
//                   >
//                     <i className="bi bi-trash3-fill"></i>
//                   </button>
//                 </div>
//               </li>
//             ))}
//             <div className="total">Total: Rs {totalPrice}</div>
//             <Button
//               className="btn btn-primary"
//               style={{ width: "100%" }}
//               onClick={() => setShowModal(true)}
//             >
//               Checkout
//             </Button>
//           </>
//         )}
//       </div>
//       <CheckoutPopup
//         show={showModal}
//         handleClose={() => setShowModal(false)}
//         cartItems={cartItems}
//         totalPrice={totalPrice}
//         handleCheckout={handleCheckout}
//       />
//     </div>

//   );
// };

// export default Cart;
// import React, { useContext, useEffect, useState } from "react";
// import AppContext from "../Context/Context";
// import axios from "axios";
// import CheckoutPopup from "./CheckoutPopup";
// import { Button } from "react-bootstrap";

// const Cart = () => {
//   const { cart, removeFromCart, clearCart } = useContext(AppContext);

//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [showModal, setShowModal] = useState(false);

//   /* =========================
//      SYNC CART WITH BACKEND
//      ========================= */
//   useEffect(() => {
//     const syncCart = async () => {
//       try {
//         // 🔹 Get latest products from backend
//         const res = await axios.get("http://localhost:8080/api/products");
//         const backendProducts = res.data;

//         const backendMap = {};
//         backendProducts.forEach((p) => {
//           backendMap[p.id] = p;
//         });

//         // 🔹 Remove items whose stock is 0
//         const validCartItems = cart.filter((item) => {
//           const backendItem = backendMap[item.id];

//           if (!backendItem || backendItem.stockQuantity === 0) {
//             removeFromCart(item.id); // 🔥 AUTO REMOVE
//             return false;
//           }
//           return true;
//         });

//         // 🔹 Fetch images
//         const cartWithImages = await Promise.all(
//           validCartItems.map(async (item) => {
//             try {
//               const imgRes = await axios.get(
//                 `http://localhost:8080/api/product/${item.id}/image`,
//                 { responseType: "blob" }
//               );
//               const imageUrl = URL.createObjectURL(imgRes.data);
//               return { ...item, imageUrl };
//             } catch {
//               return { ...item, imageUrl: "" };
//             }
//           })
//         );

//         setCartItems(cartWithImages);
//       } catch (err) {
//         console.error("Cart sync error:", err);
//       }
//     };

//     if (cart.length > 0) {
//       syncCart();
//     } else {
//       setCartItems([]);
//     }
//   }, [cart, removeFromCart]);

//   /* =========================
//      TOTAL PRICE
//      ========================= */
//   useEffect(() => {
//     const total = cartItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//     setTotalPrice(total);
//   }, [cartItems]);

//   /* =========================
//      QUANTITY HANDLERS
//      ========================= */
//   const increaseQty = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id && item.quantity < item.stockQuantity
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const decreaseQty = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
//           : item
//       )
//     );
//   };

//   /* =========================
//      CHECKOUT
//      ========================= */
//   const handleCheckout = async () => {
//     try {
//       for (const item of cart) {
//         const updatedStock = item.stockQuantity - item.quantity;

//         const updatedProduct = {
//           ...item,
//           stockQuantity: updatedStock,
//         };

//         const formData = new FormData();
//         formData.append(
//           "product",
//           new Blob([JSON.stringify(updatedProduct)], {
//             type: "application/json",
//           })
//         );

//         await axios.put(
//           `http://localhost:8080/api/product/${item.id}`,
//           formData
//         );

//         // 🔥 REMOVE ITEM IF STOCK = 0
//         if (updatedStock === 0) {
//           removeFromCart(item.id);
//         }
//       }

//       clearCart();
//       setCartItems([]);
//       setShowModal(false);
//     } catch (err) {
//       console.error("Checkout failed:", err);
//     }
//   };

//   /* =========================
//      UI
//      ========================= */
//   return (
//     <div className="cart-container">
//       <div className="shopping-cart">
//         <div className="title">Shopping Bag</div>

//         {cartItems.length === 0 ? (
//           <div className="empty">
//             <h4>Your cart is empty</h4>
//           </div>
//         ) : (
//           <>
//             {cartItems.map((item) => (
//               <div key={item.id} className="cart-item">
//                 <img
//                   src={item.imageUrl}
//                   alt={item.name}
//                   className="cart-item-image"
//                 />

//                 <div className="description">
//                   <span>{item.brand}</span>
//                   <span>{item.name}</span>
//                 </div>

//                 <div className="quantity">
//                   <button onClick={() => increaseQty(item.id)}>+</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => decreaseQty(item.id)}>-</button>
//                 </div>

//                 <div className="total-price">
//                   Rs {item.price * item.quantity}
//                 </div>

//                 <button
//                   className="remove-btn"
//                   onClick={() => removeFromCart(item.id)}
//                 >
//                   🗑
//                 </button>
//               </div>
//             ))}

//             <div className="total">Total: Rs {totalPrice}</div>

//             <Button onClick={() => setShowModal(true)}>Checkout</Button>
//           </>
//         )}
//       </div>

//       <CheckoutPopup
//         show={showModal}
//         handleClose={() => setShowModal(false)}
//         cartItems={cartItems}
//         totalPrice={totalPrice}
//         handleCheckout={handleCheckout}
//       />
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "axios";
import CheckoutPopup from "./CheckoutPopup";
import { Button } from "react-bootstrap";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const urlToFile = async (url, filename) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};


  /* =========================
     SYNC CART WITH BACKEND
     ========================= */
  useEffect(() => {
    const syncCart = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        const backendProducts = res.data;

        const backendMap = {};
        backendProducts.forEach((p) => (backendMap[p.id] = p));

        const validItems = [];

        for (const item of cart) {
          const backendItem = backendMap[item.id];

          if (!backendItem || backendItem.stockQuantity === 0) {
            removeFromCart(item.id);
            continue;
          }

          const imgRes = await axios.get(
            `http://localhost:8080/api/product/${item.id}/image`,
            { responseType: "blob" }
          );

          validItems.push({
            ...item,
            stockQuantity: backendItem.stockQuantity,
            imageUrl: URL.createObjectURL(imgRes.data),
          });
        }

        setCartItems(validItems);
      } catch (err) {
        console.error("Cart sync error:", err);
      }
    };

    if (cart.length > 0) syncCart();
    else setCartItems([]);
  }, [cart, removeFromCart]);

  /* =========================
     TOTAL PRICE
     ========================= */
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  /* =========================
     QUANTITY HANDLERS
     ========================= */
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity < item.stockQuantity
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  /* =========================
     CHECKOUT (FIXED)
     ========================= */
  // const handleCheckout = async () => {
  //   try {
  //     for (const item of cartItems) {
  //       const updatedStock = item.stockQuantity - item.quantity;

  //       if (updatedStock < 0) {
  //         alert("Stock error detected");
  //         return;
  //       }

  //       const formData = new FormData();
  //       formData.append(
  //         "product",
  //         new Blob(
  //           [
  //             JSON.stringify({
  //               ...item,
  //               stockQuantity: updatedStock,
  //             }),
  //           ],
  //           { type: "application/json" }
  //         )
  //       );

  //       await axios.put(
  //         `http://localhost:8080/api/product/${item.id}`,
  //         formData
  //       );
  //     }

  //     clearCart();
  //     setCartItems([]);
  //     setShowModal(false);
  //     alert("Purchase successful ✅");
  //   } catch (err) {
  //     console.error("Checkout failed:", err);
  //     alert("Checkout failed ❌");
  //   }
  // };


//   const handleCheckout = async () => {
//   try {
//     for (const item of cartItems) {
//       const updatedStock = item.stockQuantity - item.quantity;

//       const updatedProduct = {
//         ...item,
//         stockQuantity: updatedStock,
//         productAvailable: updatedStock > 0,
//       };

//       const formData = new FormData();

//       // ✅ REQUIRED BY BACKEND
//       formData.append(
//         "product",
//         new Blob([JSON.stringify(updatedProduct)], {
//           type: "application/json",
//         })
//       );

//       // ✅ DUMMY IMAGE (VERY IMPORTANT)
//       formData.append(
//         "imageFile",
//         new File(["dummy"], "dummy.jpg", { type: "image/jpeg" })
//       );

//       await axios.put(
//         `http://localhost:8080/api/product/${item.id}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//     }

//     clearCart();
//     setCartItems([]);
//     setShowModal(false);
//     alert("Purchase successful ✅");

//   } catch (error) {
//     console.error("Checkout failed:", error);
//     alert("Checkout failed ❌");
//   }
// };

const handleCheckout = async () => {
  try {
    for (const item of cartItems) {
      const updatedStock = item.stockQuantity - item.quantity;

      const updatedProduct = {
        ...item,
        stockQuantity: updatedStock,
        productAvailable: updatedStock > 0,
      };

      // ✅ CONVERT EXISTING IMAGE URL TO FILE
      const imageFile = await urlToFile(
        item.imageUrl,
        `product_${item.id}.jpg`
      );

      const formData = new FormData();

      formData.append(
        "product",
        new Blob([JSON.stringify(updatedProduct)], {
          type: "application/json",
        })
      );

      // ✅ REAL IMAGE (NOT DUMMY)
      formData.append("imageFile", imageFile);

      await axios.put(
        `http://localhost:8080/api/product/${item.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    }

    clearCart();
    setCartItems([]);
    setShowModal(false);
    alert("Purchase successful ✅");

  } catch (error) {
    console.error("Checkout failed:", error);
    alert("Checkout failed ❌");
  }
};

  /* =========================
     UI
     ========================= */
  return (
    <div className="cart-container">
      <div className="shopping-cart">
        <h3>Shopping Bag</h3>

        {cartItems.length === 0 ? (
          <h5>Your cart is empty</h5>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  width="80"
                  height="80"
                />

                <div>
                  <strong>{item.name}</strong>
                  <p>{item.brand}</p>
                </div>

                <div>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <div>₹ {item.price * item.quantity}</div>

                <button onClick={() => removeFromCart(item.id)}>🗑</button>
              </div>
            ))}

            <h4>Total: ₹ {totalPrice}</h4>

            <Button onClick={() => setShowModal(true)}>Checkout</Button>
          </>
        )}
      </div>

      <CheckoutPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default Cart;
