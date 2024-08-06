const express = require('express');
const Auction = require('../models/auction');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Auction
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, startingBid, endDate } = req.body;

    const auction = new Auction({
      title,
      description,
      startingBid,
      currentBid: startingBid,
      endDate,
      createdBy: req.user.userId,
    });

    await auction.save();
    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Auctions
router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find().populate('createdBy', 'username');
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
