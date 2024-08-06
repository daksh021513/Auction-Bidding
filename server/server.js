const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3001', // Change this to match your React app's address
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you need to send cookies or authentication headers
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Import and use your user routes
const userRoutes = require('./routes/users'); // Ensure the path is correct
app.use('/api/users', userRoutes); // Use the correct prefix for user routes

// Import and use your auction routes
const auctionRoutes = require('./routes/auctions'); // Ensure this path is correct
app.use('/api/auctions', auctionRoutes); // Add auction routes here

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
