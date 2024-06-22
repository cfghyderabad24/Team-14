const express = require('express');
const ScholarshipRequest = require('../models/ScholarshipRequest');
const router = express.Router();

// Create a new scholarship request
router.post('/', async (req, res) => {
  const { name, email, course, amount, collegeName, bankAccountNumber } = req.body;

  try {
    const newRequest = new ScholarshipRequest({
      name,
      email,
      course,
      amount,
      collegeName,
      bankAccountNumber,
    });

    const request = await newRequest.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all scholarship requests
router.get('/', async (req, res) => {
  try {
    const requests = await ScholarshipRequest.find();
    res.json(requests);
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
