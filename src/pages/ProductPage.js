import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Số sản phẩm trên mỗi trang

  useEffect(() => {
    // Fetch products from API
    axios.get('http://localhost:5000/products')
      .then((response) => {
        console.log('Fetched products:', response.data); // Kiểm tra dữ liệu trả về
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.log('Error fetching products:', error));  // Bắt lỗi nếu có
  }, []);
  

  // Filter products
  useEffect(() => {
    let filtered = [...products];

    if (filterBrand !== 'all') {
      filtered = filtered.filter((product) => product.brand === filterBrand);
    }

    if (filterPrice === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filterPrice === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi bộ lọc
  }, [filterBrand, filterPrice, products]);

  // Calculate products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center">Tất cả sản phẩm</h1>

        {/* Filter Menu */}
        <div className="d-flex justify-content-between align-items-center my-4">
          <div>
            <label htmlFor="brand" className="me-2">Thương hiệu:</label>
            <select
              id="brand"
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="form-select d-inline w-auto"
            >
              <option value="all">Tất cả</option>
              <option value="Replica">Replica</option>
              <option value="Tomford">Tomford</option>
              <option value="Creed">Creed</option>
              <option value="Chanel">Chanel</option>
              <option value="Dior">Dior</option>
              <option value="Valentino">Valentino</option>
              <option value="Killian">Killian</option>
              <option value="Acqua Di Gio">Acqua Di Gio</option>
              <option value="Versace">Versace</option>
              <option value="Gucci">Gucci</option>
            </select>
          </div>

          <div>
            <label htmlFor="price" className="me-2">Sắp xếp giá:</label>
            <select
              id="price"
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="form-select d-inline w-auto"
            >
              <option value="all">Mặc định</option>
              <option value="low">Giá thấp đến cao</option>
              <option value="high">Giá cao đến thấp</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="row">
          {currentProducts.length === 0 ? (
            <p>Không có sản phẩm nào!</p>
          ) : (
            currentProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <div className="card h-100">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.price} USD</p>
                    <Link to={`/product/${product._id}`} className="btn btn-primary">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center mt-4">
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
