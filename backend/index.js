// backend/index.js
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const path = require('path');
const orderRoutes = require('./routes/orders'); // Import route cho đơn hàng


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Cấu hình Express để phục vụ các tệp tĩnh từ thư mục public
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes); // Sử dụng route cho đơn hàng

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
