const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
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
  },
  medicines: [
    {
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
      dateAdded: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;
