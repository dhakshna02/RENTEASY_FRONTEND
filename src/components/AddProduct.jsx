import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    city: "",
    productAvailable: false,
  });

  const [image, setImage] = useState(null);

  // 📍 AVAILABLE CITIES
  const cities = ["Chennai", "Bangalore", "Hyderabad", "Mumbai"];

  // 🔄 HANDLE INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // 🖼 IMAGE
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 🚀 SUBMIT
  const submitHandler = (event) => {
    event.preventDefault();

    // ✅ CLEAN CITY BEFORE SEND
    const cleanedProduct = {
      ...product,
      city: product.city.trim(),
    };

    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(cleanedProduct)], {
        type: "application/json",
      })
    );

    axios
      .post("http://localhost:8080/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          {/* NAME */}
          <div className="col-md-6">
            <label className="form-label">
              <h6>Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              value={product.name}
              name="name"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* BRAND */}
          <div className="col-md-6">
            <label className="form-label">
              <h6>Brand</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Brand"
              value={product.brand}
              name="brand"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Add product description"
              value={product.description}
              name="description"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* PRICE */}
          <div className="col-md-5">
            <label className="form-label">
              <h6>Price</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Eg: 1000"
              value={product.price}
              name="price"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* CATEGORY */}
          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select
              className="form-select"
              value={product.category}
              name="category"
              onChange={handleInputChange}
              required
            >
              <option value="">Select category</option>
              <option value="Sports">Sports</option>
              <option value="Sedan">Sedan</option>
              <option value="Suv">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Crossover">Crossover</option>
              <option value="Hypersports">Hypersports</option>
            </select>
          </div>

          {/* 📍 CITY DROPDOWN */}
          <div className="col-md-6">
            <label className="form-label">
              <h6>City</h6>
            </label>
            <select
              className="form-select"
              name="city"
              value={product.city}
              onChange={handleInputChange}
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* STOCK */}
          <div className="col-md-4">
            <label className="form-label">
              <h6>Stock Quantity</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Stock Remaining"
              value={product.stockQuantity}
              name="stockQuantity"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* RELEASE DATE */}
          <div className="col-md-4">
            <label className="form-label">
              <h6>Release Date</h6>
            </label>
            <input
              type="date"
              className="form-control"
              value={product.releaseDate}
              name="releaseDate"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* IMAGE */}
          <div className="col-md-4">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
              required
            />
          </div>

          {/* AVAILABLE */}
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={product.productAvailable}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    productAvailable: e.target.checked,
                  })
                }
              />
              <label className="form-check-label">
                Product Available
              </label>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
