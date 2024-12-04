const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Đảm bảo lấy giá trị từ .env
    if (!mongoURI) {
      console.error('MONGO_URI is not defined in .env file');
      return process.exit(1); // Nếu không có URI, dừng lại
    }
    await mongoose.connect(mongoURI); // Loại bỏ các tùy chọn deprecated
    console.log('MongoDB connected!');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Thoát chương trình nếu kết nối thất bại
  }
};

module.exports = connectDB;
