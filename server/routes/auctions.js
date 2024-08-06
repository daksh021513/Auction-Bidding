// server/routes/auctions.js
const express = require('express');
const Auction = require('../models/auction');
const router = express.Router();

// Create auction
router.post('/', async (req, res) => {
  try {
    const newAuction = new Auction(req.body);
    await newAuction.save();
    res.status(201).json(newAuction);
  } catch (error) {
    console.error('Error creating auction:', error);
    res.status(500).json({ message: 'Error creating auction', error });
  }
});

// Get all auctions
router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (error) {
    console.error('Error fetching auctions:', error);
    res.status(500).json({ message: 'Error fetching auctions', error });
  }
});

// Update auction
router.put('/:id', async (req, res) => {
  try {
    const auction = await Auction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(auction);
  } catch (error) {
    console.error('Error updating auction:', error);
    res.status(500).json({ message: 'Error updating auction', error });
  }
});

// Delete auction
router.delete('/:id', async (req, res) => {
  try {
    await Auction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Auction deleted' });
  } catch (error) {
    console.error('Error deleting auction:', error);
    res.status(500).json({ message: 'Error deleting auction', error });
  }
});

// Place bid
router.post('/:id/bid', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    const { amount } = req.body;
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: 'Invalid bid amount' });
    }

    if (amount > auction.currentBid) {
      auction.currentBid = amount;
      auction.bidHistory.push({ amount });
      await auction.save();
      return res.json({ message: 'Bid placed successfully', auction });
    } else {
      return res.status(400).json({ message: 'Bid must be higher than the current bid' });
    }
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(500).json({ message: 'Error placing bid', error });
  }
});

module.exports = router;
