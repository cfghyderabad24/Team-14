// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Create a new notification
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  try {
    const newNotification = new Notification({
      title,
      description,
    });

    const notification = await newNotification.save();
    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date: -1 });
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
