const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products');

// Cấu hình môi trường
dotenv.config();

// Kết nối MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Cho phép kết nối từ các domain khác
app.use(express.json()); // Đọc request body dạng JSON (thay cho body-parser)

// Routes
app.use('/products', productRoutes); // Prefix chuẩn RESTful cho API

// Xử lý lỗi cho các route không tồn tại
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Xử lý lỗi server (nếu có)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Lắng nghe kết nối
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
