const express = require('express');
const multer = require('multer');
const path = require('path');
const RenewalRequest = require('../models/RenewalRequest');
const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

// Check file type
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

// Create a new renewal request
router.post('/', upload.fields([
  { name: 'incomeStatement', maxCount: 1 },
  { name: 'receipt', maxCount: 1 },
  { name: 'collegeMarksheet', maxCount: 1 }
]), async (req, res) => {
  const { name, email, amount } = req.body;

  // Check if files are uploaded
  if (!req.files || !req.files['incomeStatement'] || !req.files['receipt'] || !req.files['collegeMarksheet']) {
    return res.status(400).json({ error: 'Please upload income statement, receipt, and college marksheet' });
  }

  const incomeStatement = req.files['incomeStatement'][0].path;
  const receipt = req.files['receipt'][0].path;
  const collegeMarksheet = req.files['collegeMarksheet'][0].path;

  try {
    const newRequest = new RenewalRequest({
      name,
      email,
      amount,
      incomeStatement,
      receipt,
      collegeMarksheet,
    });

    const request = await newRequest.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all renewal requests
router.get('/', async (req, res) => {
  try {
    const requests = await RenewalRequest.find().sort({ date: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a specific renewal request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await RenewalRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: 'Renewal request not found' });
    }

    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a renewal request
router.put('/:id', upload.fields([
  { name: 'incomeStatement', maxCount: 1 },
  { name: 'receipt', maxCount: 1 },
  { name: 'collegeMarksheet', maxCount: 1 }
]), async (req, res) => {
  const { name, email, amount, approvedBy } = req.body;

  const updatedFields = { name, email, amount, approvedBy };

  // Check if files are uploaded and add to updatedFields if they are
  if (req.files) {
    if (req.files['incomeStatement']) {
      updatedFields.incomeStatement = req.files['incomeStatement'][0].path;
    }
    if (req.files['receipt']) {
      updatedFields.receipt = req.files['receipt'][0].path;
    }
    if (req.files['collegeMarksheet']) {
      updatedFields.collegeMarksheet = req.files['collegeMarksheet'][0].path;
    }
  }

  try {
    let request = await RenewalRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: 'Renewal request not found' });
    }

    request = await RenewalRequest.findByIdAndUpdate(
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

// Delete a renewal request
router.delete('/:id', async (req, res) => {
  try {
    const request = await RenewalRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ msg: 'Renewal request not found' });
    }

    await RenewalRequest.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Renewal request removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
