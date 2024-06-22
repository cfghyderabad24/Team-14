const mongoose = require('mongoose');

const RenewalRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  incomeStatement: {
    type: String,
    required: true,
  },
  receipt: {
    type: String,
    required: true,
  },
  collegeMarksheet: {
    type: String,
    required: true,
  },
  approvedBy: {
    type: [String],
    enum: ['NGO', 'volunteer', 'trustee'],
    default: [],
  },
});

const ScholarshipRequest = mongoose.model('RenewalRequestSchema', RenewalRequestSchema);

module.exports = ScholarshipRequest;
