import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer

const CartPage = () => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar /> {/* Thêm Navbar */}
        <div className="container my-5">
          <h1 className="text-center">Giỏ hàng</h1>
          <p className="text-center">Giỏ hàng của bạn hiện đang trống.</p>
        </div>
        <Footer /> {/* Thêm Footer */}
      </>
    );
  }

  return (
    <>
      <Navbar /> {/* Thêm Navbar */}
      <div className="container my-5">
        <h1 className="text-center">Giỏ hàng</h1>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Tổng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price} USD</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value, 10))
                    }
                    style={{ width: '60px' }}
                  />
                </td>
                <td>{item.price * item.quantity} USD</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-end">
          <h4>Tổng cộng: {calculateTotal()} USD</h4>
          <button className="btn btn-primary mt-3">Tiến hành thanh toán</button>
        </div>
      </div>
      <Footer /> {/* Thêm Footer */}
    </>
  );
};

export default CartPage;
