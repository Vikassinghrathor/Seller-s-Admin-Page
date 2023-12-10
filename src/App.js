import React, { useState, useEffect } from "react";

const SellerAdminPage = () => {
  const [inputData, setinputData] = useState({
    productId: "",
    sellingPrice: "",
    productName: "",
  });

  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
    calculateTotalValue(storedProducts);
  }, []);

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setinputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addProduct = () => {
    const { productId, sellingPrice, productName } = inputData;

    if (!productId || !sellingPrice || !productName) {
      alert("Please fill in all fields");
      return;
    }

    const newProduct = {
      id: productId,
      price: parseFloat(sellingPrice),
      name: productName,
    };

    setProducts([...products, newProduct]);
    updateLocalStorage([...products, newProduct]);

    // Clear input fields after adding the product
    setinputData({
      productId: "",
      sellingPrice: "",
      productName: "",
    });
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
  };

  const updateLocalStorage = (data) => {
    localStorage.setItem("products", JSON.stringify(data));
    calculateTotalValue(data);
  };

  const calculateTotalValue = (data) => {
    const total = data.reduce((acc, product) => acc + product.price, 0);
    setTotalValue(total);
  };

  return (
    <div>
      <h1>Seller's Admin Page</h1>
      <label>Product ID:</label>
      <input
        type="number"
        name="productId"
        value={inputData.productId}
        onChange={inputHandler}
      />
      <label>Selling Price:</label>
      <input
        type="number"
        name="sellingPrice"
        value={inputData.sellingPrice}
        onChange={inputHandler}
      />
      <label>Product Name:</label>
      <input
        type="text"
        name="productName"
        value={inputData.productName}
        onChange={inputHandler}
      />
      <button onClick={addProduct}>Add Product</button>

      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Total value Worth of Products: Rs{totalValue.toFixed(2)}</h3>
    </div>
  );
};

export default SellerAdminPage;
