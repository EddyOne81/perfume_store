import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  const addToCart = () => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (existingItemIndex >= 0) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Đã thêm vào giỏ hàng!');
  };

  if (!product) {
    return (
      <>
        <Navbar /> {/* Thêm Navbar */}
        <p>Loading...</p>
        <Footer /> {/* Thêm Footer */}
      </>
    );
  }

  return (
    <>
      <Navbar /> {/* Thêm Navbar */}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} alt={product.name} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h1>{product.name}</h1>
            <p className="lead">{product.description}</p>
            <h4>Giá: {product.price} USD</h4>
            <button onClick={addToCart} className="btn btn-success mt-3">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
      <Footer /> {/* Thêm Footer */}
    </>
  );
};

export default ProductDetailPage;
