const mongoose = require('mongoose');

const ScholarshipRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  bankAccountNumber: {
    type: String,
    required: true,
  },
  incomeStatement: {
    type: String,
    required: true,
  },
  marksheet: {
    type: String,
    required: true,
  },
  approvedBy: {
    type: [String],
    enum: ['NGO', 'volunteer', 'trustee'],
    default: [],
  },
});

const ScholarshipRequest = mongoose.model('ScholarshipRequest', ScholarshipRequestSchema);

module.exports = ScholarshipRequest;
