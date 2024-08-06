const express = require('express');
const router = express.Router();
const Auction = require('../models/auction');

// Get all auctions
router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching auctions' });
  }
});

module.exports = router;
