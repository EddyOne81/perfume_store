import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} FRAGRANTICA. All Rights Reserved.</p>
        <p>
          <a href="/" className="text-white me-3">Privacy Policy</a>
          <a href="/" className="text-white">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
