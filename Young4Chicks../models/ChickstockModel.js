const mongoose = require('mongoose');

// 1️⃣ Define the schema (blueprint of your data)
const chickStockSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true, 
    enum: ['Broiler', 'Layer'] // allowed chick types
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 0 // no negative stock
  },
  dateAdded: { 
    type: Date, 
    default: Date.now // auto set to current date
  }
});

// 2️⃣ Create a model from the schema
const ChickStock = mongoose.model('ChickStock', chickStockSchema);

// 3️⃣ Export the model so we can use it in routes
module.exports = ChickStock;