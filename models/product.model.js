const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  productLocation: {
    destination: { type: String, required: true },
    current: { type: String, required: true }
  },
  image: { type: String, required: true }
});
var x
module.exports = mongoose.model('Product', productSchema);

