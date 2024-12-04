// src/pages/CheckoutPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [shippingAddress, setShippingAddress] = useState('');
  const [cart, setCart] = useState([
    // Giả sử giỏ hàng có 2 sản phẩm
    { id: 1, name: 'Replica Jazz Club', price: 100, quantity: 2 },
    { id: 2, name: 'Tomford Oud Wood', price: 150, quantity: 1 },
  ]);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleCheckout = async () => {
    const order = {
      user,
      products: cart,
      totalAmount,
      shippingAddress,
    };

    try {
      const response = await axios.post('http://localhost:5000/orders/create', order);
      console.log(response.data);
      alert('Đơn hàng của bạn đã được xác nhận!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Thanh toán</h1>
      <div className="form-group">
        <label>Tên:</label>
        <input
          type="text"
          className="form-control"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Địa chỉ giao hàng:</label>
        <input
          type="text"
          className="form-control"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
      </div>
      <div className="text-center mt-4">
        <h4>Tổng tiền: {totalAmount} USD</h4>
        <button onClick={handleCheckout} className="btn btn-success mt-3">
          Xác nhận đơn hàng
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
