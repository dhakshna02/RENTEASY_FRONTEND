// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import AppContext from "../Context/Context";
// import Navbar from "./Navbar";
// import unplugged from "../assets/unplugged.png";

// const Home = ({ selectedCategory }) => {
//   const { isError, addToCart } = useContext(AppContext);

//   // 📍 CITY STATE (default city)
//  const [city, setCity] = useState("Chennai");

//   // 📦 PRODUCTS STATE
//    const [products, setProducts] = useState([]);

//   useEffect(() => {
//   console.log("Home received category:", selectedCategory);
// }, [selectedCategory]);



//   /* =========================
//      FETCH PRODUCTS BY CITY
//      ========================= */
//   useEffect(() => {
//     if (!city) return;

//     axios
//       .get("http://localhost:8080/api/products/home", {
//         params: { city: city.trim() },
//       })
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching products by city:", error);
//       });
//   }, [city]);

//   /* =========================
//      FETCH IMAGES FOR PRODUCTS
//      ========================= */
//   useEffect(() => {
//     if (products.length === 0) return;

//     const fetchImagesAndUpdateProducts = async () => {
//       const updatedProducts = await Promise.all(
//         products.map(async (product) => {
//           try {
//             const response = await axios.get(
//               `http://localhost:8080/api/product/${product.id}/image`,
//               { responseType: "blob" }
//             );
//             const imageUrl = URL.createObjectURL(response.data);
//             return { ...product, imageUrl };
//           } catch (error) {
//             console.error(
//               "Error fetching image for product ID:",
//               product.id,
//               error
//             );
//             return { ...product, imageUrl: "" };
//           }
//         })
//       );
//       setProducts(updatedProducts);
//     };

//     fetchImagesAndUpdateProducts();
//   }, [products.length]);

//   /* =========================
//      CATEGORY FILTER
//      ========================= */
//   // const filteredProducts = selectedCategory
//   //   ? products.filter((product) => product.category === selectedCategory)
//   //   : products;

//   const filteredProducts = selectedCategory
//   ? products.filter(
//       (product) =>
//         product.category.toLowerCase() === selectedCategory.toLowerCase()
//     )
//   : products;


//   /* =========================
//      ERROR UI
//      ========================= */
//   if (isError) {
//     return (
//       <h2 className="text-center" style={{ padding: "18rem" }}>
//         <img
//           src={unplugged}
//           alt="Error"
//           style={{ width: "100px", height: "100px" }}
//         />
//       </h2>
//     );
//   }

//   return (
//     <>
//       {/* ✅ NAVBAR WITH CITY SUPPORT  <Navbar onCityChange={setCity} />. */}
      

//       <div
//         className="grid"
//         style={{
//           marginTop: "64px",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//           gap: "20px",
//           padding: "20px",
//         }}
//       >
//         {filteredProducts.length === 0 ? (
//           <h2
//             className="text-center"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             No Products Available
//           </h2>
//         ) : (
//           filteredProducts.map((product) => {
//             const { id, brand, name, price, productAvailable, imageUrl } =
//               product;

//             return (
//               <div
//                 className="card mb-3"
//                 key={id}
//                 style={{
//                   width: "250px",
//                   height: "360px",
//                   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                   borderRadius: "10px",
//                   overflow: "hidden",
//                   backgroundColor: productAvailable ? "#fff" : "#ccc",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "flex-start",
//                   alignItems: "stretch",
//                 }}
//               >
//                 <Link
//                   to={`/product/${id}`}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                 >
//                   <img
//                     src={imageUrl}
//                     alt={name}
//                     style={{
//                       width: "100%",
//                       height: "150px",
//                       objectFit: "cover",
//                       padding: "5px",
//                       margin: "0",
//                       borderRadius: "10px",
//                     }}
//                   />

//                   <div
//                     className="card-body"
//                     style={{
//                       flexGrow: 1,
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "space-between",
//                       padding: "10px",
//                     }}
//                   >
//                     <div>
//                       <h5
//                         className="card-title"
//                         style={{
//                           margin: "0 0 10px 0",
//                           fontSize: "1.2rem",
//                         }}
//                       >
//                         {name.toUpperCase()}
//                       </h5>
//                       <i
//                         className="card-brand"
//                         style={{
//                           fontStyle: "italic",
//                           fontSize: "0.8rem",
//                         }}
//                       >
//                         {"~ " + brand}
//                       </i>
//                     </div>

//                     <hr className="hr-line" style={{ margin: "10px 0" }} />

//                     <div className="home-cart-price">
//                       <h5
//                         className="card-text"
//                         style={{
//                           fontWeight: "600",
//                           fontSize: "1.1rem",
//                           marginBottom: "5px",
//                         }}
//                       >
//                         <i className="bi bi-currency-rupee"></i>
//                         {price}
//                       </h5>
//                     </div>

//                     <button
//                       className="btn-hover color-9"
//                       style={{ margin: "10px 25px 0px" }}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         addToCart(product);
//                       }}
//                       disabled={!productAvailable}
//                     >
//                       {productAvailable ? "Add to Cart" : "Out of Stock"}
//                     </button>
//                   </div>
//                 </Link>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </>
//   );
// };

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Home = ({ selectedCategory, selectedCity }) => {
  const { isError, addToCart } = useContext(AppContext);

  // 📦 PRODUCTS STATE
  const [products, setProducts] = useState([]);

  /* =========================
     DEBUG (OPTIONAL)
     ========================= */
  useEffect(() => {
    console.log("Home received category:", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    console.log("Home received city:", selectedCity);
  }, [selectedCity]);

  /* =========================
     FETCH PRODUCTS BY CITY
     ========================= */
  useEffect(() => {
    if (!selectedCity) return;

    axios
      .get("http://localhost:8080/api/products/home", {
        params: { city: selectedCity.trim() },
      })
      .then((res) => setProducts(res.data))
      .catch((error) =>
        console.error("Error fetching products by city:", error)
      );
  }, [selectedCity]);

  /* =========================
     FETCH IMAGES FOR PRODUCTS
     ========================= */
  useEffect(() => {
    if (products.length === 0) return;

    const fetchImagesAndUpdateProducts = async () => {
      const updatedProducts = await Promise.all(
        products.map(async (product) => {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/product/${product.id}/image`,
              { responseType: "blob" }
            );
            const imageUrl = URL.createObjectURL(response.data);
            return { ...product, imageUrl };
          } catch (error) {
            console.error(
              "Error fetching image for product ID:",
              product.id,
              error
            );
            return { ...product, imageUrl: "" };
          }
        })
      );
      setProducts(updatedProducts);
    };

    fetchImagesAndUpdateProducts();
  }, [products.length]);

  /* =========================
     CATEGORY FILTER (FRONTEND)
     ========================= */
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      )
    : products;

  /* =========================
     ERROR UI
     ========================= */
  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        <img
          src={unplugged}
          alt="Error"
          style={{ width: "100px", height: "100px" }}
        />
      </h2>
    );
  }

  return (
    <div
      className="grid"
      style={{
        marginTop: "64px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {filteredProducts.length === 0 ? (
        <h2 className="text-center">No Products Available</h2>
      ) : (
        filteredProducts.map((product) => {
          const { id, brand, name, price, productAvailable, imageUrl } =
            product;

          return (
            <div
              className="card mb-3"
              key={id}
              style={{
                width: "250px",
                height: "360px",
                backgroundColor: productAvailable ? "#fff" : "#ccc",
              }}
            >
              <Link
                to={`/product/${id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={imageUrl}
                  alt={name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">
                  <h5>{name.toUpperCase()}</h5>
                  <i>{"~ " + brand}</i>
                  <h5>₹ {price}</h5>

                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    disabled={!productAvailable}
                  >
                    {productAvailable ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
