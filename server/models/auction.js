const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  amount: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now }
});

const auctionSchema = new mongoose.Schema({
  title: String,
  description: String,
  startingBid: Number,
  currentBid: { type: Number, default: 0 },
  bidHistory: [
    {
      amount: Number,
      userId: mongoose.Schema.Types.ObjectId, // Assuming bids are linked to users
      timestamp: { type: Date, default: Date.now }
    }
  ],
  // Additional fields if necessary
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
