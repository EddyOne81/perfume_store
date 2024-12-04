const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected!');

    const sampleProducts = [
      { name: 'Replica Jazz Club', price: 100, description: 'Fresh and long-lasting fragrance', image: 'assets/Replica.jpg', brand: 'Replica' },
      { name: 'Tomford Ombre Leather', price: 150, description: 'Sweet and floral aroma', image: 'assets/tomfordombre.jpg', brand: 'Tomford' },
      { name: 'Creed Aventus', price: 200, description: 'Bold and spicy scent', image: 'assets/creed.jpg', brand: 'Creed' },
      { name: 'Bleu De Chanel', price: 200, description: 'Fresh and long-lasting fragrance', image: 'assets/chanelbleu.jpg', brand: 'Chanel' },
      { name: 'Dior Sauvage', price: 180, description: 'Sweet and floral aroma', image: 'assets/diorsauvage.jpg', brand: 'Dior' },
      { name: 'Valentino Coral Fantasy', price: 180, description: 'Sweet and floral aroma', image: 'assets/valentinonau.jpg', brand: 'Valentino' },
      { name: 'Killian Sacred Wood', price: 300, description: 'Fresh and long-lasting fragrance', image: 'assets/killianwood.jpg', brand: 'Killian' },
      { name: 'Acqua Di Gio', price: 150, description: 'Sweet and floral aroma', image: 'assets/aquagio.jpg', brand: 'Acqua Di Gio' },
      { name: 'Valentino Yellow Dream', price: 200, description: 'Bold and spicy scent', image: 'assets/valentinovang.jpg', brand: 'Valentino' },
      { name: 'Versace Eros', price: 200, description: 'Bold and spicy scent', image: 'assets/eros.jpg', brand: 'Versace' },
      { name: 'Tomford Oud Wood', price: 130, description: 'Fresh and long-lasting fragrance', image: 'assets/tomford1.jpg', brand: 'Tomford' },
      { name: 'Gucci Guilty Pour Homme', price: 250, description: 'Bold and spicy scent', image: 'assets/gucciguilty.jpg', brand: 'Gucci' }
   ];
   

    await Product.insertMany(sampleProducts);
    console.log('Seed data added!');
    mongoose.connection.close();
  })
  .catch((err) => console.error('Seed error:', err));
