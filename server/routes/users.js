const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Auction = require('../models/auction'); // Ensure this import is present
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    } 

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch user profile
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('bidHistory.auctionId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
});

// Fetch user's auctions
router.get('/:id/auctions', async (req, res) => {
  try {
    const auctions = await Auction.find({ ownerId: req.params.id });
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user auctions', error });
  }
});

// Fetch user's bids
router.get('/:id/bids', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('bidHistory.auctionId');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.bidHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user bids', error });
  }
});

module.exports = router;
