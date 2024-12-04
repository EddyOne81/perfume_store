import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <Navbar /> {/* Sử dụng Navbar */}
      {/* Slider quảng cáo */}
      <div className="container mt-4">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/slider1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Khám phá nước hoa cao cấp</h3>
              <p>Sang trọng, đẳng cấp, và quyến rũ.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/slider2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Mang hương thơm đến cuộc sống</h3>
              <p>Chọn mùi hương phù hợp với bạn.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/d.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Ưu đãi đặc biệt</h3>
              <p>Mua sắm ngay để nhận ưu đãi hấp dẫn.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="container my-5">
        <h1 className="text-center mb-4">Top list</h1>
        <div className="row">
          {products.slice(0, 3).map((product) => ( // Chỉ lấy 3 sản phẩm đầu tiên
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price} USD</p>
                  <Link to={`/product/${product.id}`} className="btn btn-primary">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer /> {/* Sử dụng Footer */}
    </>
  );
};

export default HomePage;
