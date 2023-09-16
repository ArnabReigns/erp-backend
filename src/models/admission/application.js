const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({

  profile_img: { type: String, default: '' },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number },
  middle_name: { type: String, default: '' },
  date_of_birth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  cma: { type: String, default: '' },
  nationality: { type: String, default: '' },
  religion: { type: String, default: '' },
  category: { type: String, default: '' },
  contact_number: { type: String, default: '' },
  email: { type: String, default: '' },
  applying_for: { type: String, default: '' },
  fisc_year: { type: String, default: '' },
  current_class: { type: String, default: '' },
  previous_percent: { type: Number, default: 0 },
  specialization: { type: String, default: '' },
  school_name: { type: String, default: '' },
  board: { type: String, default: '' },
  medium: { type: String, default: '' },

  residential_state: { type: String, default: '' },
  residential_city: { type: String, default: '' },
  residential_pin_code: { type: String, default: '' },

  permanent_state: { type: String, default: '' },
  permanent_city: { type: String, default: '' },
  permanent_pin_code: { type: String, default: '' },

  father_name: { type: String, default: '' },
  father_occupation: { type: String, default: '' },
  father_annual_income: { type: Number, default: 0 },
  father_number: { type: Number, default: 0 },
  father_email: { type: String, default: '' },

  mother_name: { type: String, default: '' },
  mother_occupation: { type: String, default: '' },
  mother_annual_income: { type: Number, default: 0 },
  mother_number: { type: Number, default: 0 },
  mother_email: { type: String, default: '' },

  guardian_name: { type: String, default: '' },
  guardian_occupation: { type: String, default: '' },
  guardian_annual_income: { type: Number, default: 0 },
  guardian_number: { type: Number, default: 0 },
  guardian_email: { type: String, default: '' },

  primary_contact: { type: Number, default: 0 },

  payment_date: { type: Date },
  payment_mode: { type: String, default: '' },
  challan_no: { type: String, default: '' },
  type: { type: String, enum: ['offline', 'ad', 'online', 'others'], required: true }
}, {
  timestamps: true,

});

ApplicationSchema.pre('save', function (next) {
  if (!this.date_of_birth) {
    next();
    return;
  }

  const now = new Date();
  const birthDate = new Date(this.date_of_birth);
  const ageInMilliseconds = now - birthDate;

  const ageInYears = Math.floor(ageInMilliseconds / (365 * 24 * 60 * 60 * 1000));
  this.age = ageInYears;

  next();
});


const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
