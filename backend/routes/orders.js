const express = require('express');
const router = express.Router();

let orders = []; // Mảng lưu trữ đơn hàng tạm thời

// API để tạo đơn hàng
router.post('/create', (req, res) => {
  const { user, products, totalAmount, shippingAddress } = req.body;

  if (!user || !products || products.length === 0 || !totalAmount || !shippingAddress) {
    return res.status(400).json({ message: 'Thiếu thông tin cần thiết' });
  }

  // Tạo một đơn hàng mới
  const order = {
    id: orders.length + 1,
    user,
    products,
    totalAmount,
    shippingAddress,
    date: new Date(),
    status: 'pending',
  };

  orders.push(order);

  res.status(201).json({ message: 'Đơn hàng đã được tạo', order });
});

// API để lấy thông tin tất cả đơn hàng
router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;
