const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure Multer

cloudinary.config({
  cloud_name: 'dxzdblvxh',
  api_key: '877481758223722',
  api_secret: 'xleCBgoAaI3p9rF6UIE3IweZyfc'
});

mongoose.connect('mongodb+srv://Sayan67:iruqikmanded2@cluster0.it7p7iz.mongodb.net/Techtinder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productRoutes = require('./routes/product.routes');
app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

