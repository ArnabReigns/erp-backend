const { SpatialTrackingSharp } = require('@mui/icons-material');
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({

  profile_img: String,
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: Number,
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
  father_number: Number,
  father_email: String,

  mother_name: String,
  mother_occupation: String,
  mother_annual_income: Number,
  mother_number: Number,
  mother_email: String,

  guardian_name: String,
  guardian_occupation: String,
  guardian_annual_income: Number,
  guardian_number: Number,
  guardian_email: String,

  primary_contact: Number,

  payment_date: Date,
  payment_mode: String,
  challan_no: String,
}, {
  timestamps: true
});

ApplicationSchema.pre('save', function (next) {
  if (!this.date_of_birth) {
    // If the date of birth is not set, do nothing
    next();
    return;
  }

  // Calculate age based on the date of birth
  const now = new Date();
  const birthDate = new Date(this.date_of_birth);
  const ageInMilliseconds = now - birthDate;

  const ageInYears = Math.floor(ageInMilliseconds / (365 * 24 * 60 * 60 * 1000));
  // Set the calculated age in the 'age' field
  this.age = ageInYears;

  next(); // Continue with the save operation
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
