
// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import AppContext from "../Context/Context";
// import unplugged from "../assets/unplugged.png";

// const Home = ({ selectedCategory, selectedCity,searchTerm }) => {
//   const { isError, addToCart } = useContext(AppContext);

//   // 📦 PRODUCTS STATE
//   const [products, setProducts] = useState([]);

//   /* =========================
//      DEBUG (OPTIONAL)
//      ========================= */
//   useEffect(() => {
//     console.log("Home received category:", selectedCategory);
//   }, [selectedCategory]);

//   useEffect(() => {
//     console.log("Home received city:", selectedCity);
//   }, [selectedCity]);

//   /* =========================
//      FETCH PRODUCTS BY CITY
//      ========================= */
//   // useEffect(() => {
//   //   if (!selectedCity) return;

//   //   axios
//   //     .get("http://localhost:8080/api/products/home", {
//   //       params: { city: selectedCity.trim() },
//   //     })
//   //     .then((res) => setProducts(res.data))
//   //     .catch((error) =>
//   //       console.error("Error fetching products by city:", error)
//   //     );
//   // }, [selectedCity]);

//   useEffect(() => {
//   // 🔍 BACKEND SEARCH
//   if (searchTerm && searchTerm.trim() !== "") {
//     console.log("Searching with:", searchTerm);

//     axios
//       .get("http://localhost:8080/api/products/search", {
//         params: { keyword: searchTerm.trim() },
//       })
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((err) => console.error("Search error:", err));

//     return;
//   }

//   // 📍 FETCH BY CITY (DEFAULT)
//   if (selectedCity) {
//     axios
//       .get("http://localhost:8080/api/products/home", {
//         params: { city: selectedCity.trim() },
//       })
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("City fetch error:", err));
//   }
// }, [searchTerm, selectedCity]);


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
//   }, [products]);

//   /* =========================
//      CATEGORY FILTER (FRONTEND)
//      ========================= */
//   const filteredProducts = selectedCategory
//     ? products.filter(
//         (product) =>
//           product.category?.toLowerCase() ===
//           selectedCategory.toLowerCase()
//       )
//     : products;

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
//     <div
//       className="grid"
//       style={{
//         marginTop: "64px",
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: "20px",
//         padding: "20px",
//       }}
//     >
//       {filteredProducts.length === 0 ? (
//         <h2 className="text-center">No Products Available</h2>
//       ) : (
//         filteredProducts.map((product) => {
//           const { id, brand, name, price, productAvailable, imageUrl } =
//             product;

//           return (
//             <div
//               className="card mb-3"
//               key={id}
//               style={{
//                 width: "250px",
//                 height: "360px",
//                 backgroundColor: productAvailable ? "#fff" : "#ccc",
//               }}
//             >
//               <Link
//                 to={`/product/${id}`}
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <img
//                   src={imageUrl}
//                   alt={name}
//                   style={{
//                     width: "100%",
//                     height: "150px",
//                     objectFit: "cover",
//                   }}
//                 />

//                 <div className="card-body">
//                   <h5>{name.toUpperCase()}</h5>
//                   <i>{"~ " + brand}</i>
//                   <h5>₹ {price}</h5>

//                   <button
//                     className="btn btn-primary"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       addToCart(product);
//                     }}
//                     disabled={!productAvailable}
//                   >
//                     {productAvailable ? "Add to Cart" : "Out of Stock"}
//                   </button>
//                 </div>
//               </Link>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default Home;
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Home = ({ selectedCategory, selectedCity, searchTerm }) => {
  const { isError, addToCart } = useContext(AppContext);

  // 📦 PRODUCTS (DATA ONLY — NO IMAGES)
  const [products, setProducts] = useState([]);

  // 🖼 IMAGE CACHE (IMPORTANT)
  const [imageMap, setImageMap] = useState({});

  /* =========================
     FETCH PRODUCTS (SEARCH / CITY)
     ========================= */
  useEffect(() => {
    // 🔍 SEARCH (BACKEND)
    if (searchTerm && searchTerm.trim() !== "") {
      console.log("Searching with:", searchTerm);

      axios
        .get("http://localhost:8080/api/products/search", {
          params: { keyword: searchTerm.trim() },
        })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => console.error("Search error:", err));

      return;
    }

    // 📍 CITY FETCH (DEFAULT)
    if (selectedCity) {
      axios
        .get("http://localhost:8080/api/products/home", {
          params: { city: selectedCity.trim() },
        })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => console.error("City fetch error:", err));
    }
  }, [searchTerm, selectedCity]);

  /* =========================
     FETCH IMAGES (NO LOOP)
     ========================= */
  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};

      for (const product of products) {
        if (!imageMap[product.id]) {
          try {
            const res = await axios.get(
              `http://localhost:8080/api/product/${product.id}/image`,
              { responseType: "blob" }
            );
            newImages[product.id] = URL.createObjectURL(res.data);
          } catch {
            newImages[product.id] = "";
          }
        }
      }

      if (Object.keys(newImages).length > 0) {
        setImageMap((prev) => ({ ...prev, ...newImages }));
      }
    };

    if (products.length > 0) {
      fetchImages();
    }
  }, [products]); // ✅ SAFE — no setProducts here

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

  /* =========================
     UI
     ========================= */
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
          const { id, brand, name, price, productAvailable } = product;

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
                  src={imageMap[id] || ""}
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
