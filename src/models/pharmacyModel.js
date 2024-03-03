const mongoose = require('mongoose');

// Схема адреси
const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  }
});

// Схема ліків
const MedicineSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date_added: {
    type: Date,
    required: true
  }
});

// Основна схема аптеки
const PharmacySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: AddressSchema,
    required: true
  },
  medicines: {
    type: [MedicineSchema],
    required: true
  }
});

const Pharmacy = mongoose.model('Pharmacy', PharmacySchema);

module.exports = Pharmacy;
