const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  middle_name: String,
  date_of_birth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  cma: String,
  nationality: String,
  religion: String,
  category: String,
  contact_number: String,
  email: String,
  applying_for: String,
  fisc_year: String,
  current_class: String,
  previous_percent: Number,
  specialization: String,
  school_name: String,
  board: String,
  medium: String,
  residential_state: String,
  residential_city: String,
  residential_pin_code: String,
  permanent_state: String,
  permanent_city: String,
  permanent_pin_code: String,
  father_name: String,
  father_occupation: String,
  father_annual_income: Number,
  parent_number: String,
  parent_email: String,
  payment_date: Date,
  payment_mode: String,
  challan_no: String,
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
