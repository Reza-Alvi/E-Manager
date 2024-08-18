const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  nationality: { type: String, required: true },
  address: { type: String, required: true },
  contacts: { type: String, required: true },
  category: { type: String, required: true },
  salary: { type: Number, required: true },
  photo: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
