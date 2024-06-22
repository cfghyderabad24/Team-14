const express = require('express');
const ScholarshipRequest = require('../models/ScholarshipRequest');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  // Allowed file types
  const filetypes = /jpeg|jpg|png|pdf/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images and PDFs Only!');
  }
}

// Create a new scholarship request
router.post('/', upload.fields([{ name: 'incomeStatement', maxCount: 1 }, { name: 'marksheet', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, email, course, amount, collegeName, bankAccountNumber } = req.body;

    // Check if files are uploaded
    if (!req.files || !req.files['incomeStatement'] || !req.files['marksheet']) {
      return res.status(400).json({ error: 'Please upload both income statement and marksheet' });
    }

    const incomeStatement = req.files['incomeStatement'][0].path;
    const marksheet = req.files['marksheet'][0].path;

    const newRequest = new ScholarshipRequest({
      name,
      email,
      course,
      amount,
      collegeName,
      bankAccountNumber,
      incomeStatement,
      marksheet,
    });

    const request = await newRequest.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// Get a specific scholarship request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await ScholarshipRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: 'Scholarship request not found' });
    }

    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a scholarship request
router.put('/:id', async (req, res) => {
  const { name, email, course, amount, collegeName, bankAccountNumber, approvedBy } = req.body;

  const updatedFields = { name, email, course, amount, collegeName, bankAccountNumber, approvedBy };

  try {
    let request = await ScholarshipRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: 'Scholarship request not found' });
    }

    request = await ScholarshipRequest.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a scholarship request
router.delete('/:id', async (req, res) => {
  try {
    const request = await ScholarshipRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: 'Scholarship request not found' });
    }

    await ScholarshipRequest.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Scholarship request removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
