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
    },
    city: {
      type: String,
    },
    postcode: {
      type: String,
    }
  },
  medicines: [
    {
      id: {
        type: Number,
      },
      name: {
        type: String,
     },
      price: {
        type: Number,
      },
      dateAdded: {
        type: Date,
      }
    }
  ]
});

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;
