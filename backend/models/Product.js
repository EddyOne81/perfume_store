const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, default: 'Unknown' },
  isFeatured: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', productSchema);
