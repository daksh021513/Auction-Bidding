// server/models/Auction.js
const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startingBid: { type: Number, required: true },
  currentBid: { type: Number, default: 0 },
  endDate: { type: Date, required: true },
  bids: [{ 
    userId: mongoose.Schema.Types.ObjectId, 
    amount: Number, 
    bidTime: { type: Date, default: Date.now } 
  }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Auction', auctionSchema);
