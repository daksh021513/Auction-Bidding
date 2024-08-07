// client/src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AuctionList from './components/AuctionList';
import AuctionDetails from './components/AuctionDetails';
import UserProfile from './components/UserProfile';

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null); // Ensure userId is managed here

  return (
    <Router>
      <div>
        <h1>Auction Bidding App</h1>
        {!token ? (
          <div>
            <Register />
            <Login setToken={setToken} setUserId={setUserId} /> {/* Pass setUserId */}
          </div>
        ) : (
          <>
            <nav>
              <Link to="/auctions">Auctions</Link> | <Link to="/profile">Profile</Link>
            </nav>
            <Routes>
              <Route path="/auctions" element={<AuctionList />} />
              <Route path="/auctions/:id" element={<AuctionDetails />} />
              <Route path="/profile" element={<UserProfile userId={userId} />} /> {/* Pass userId */}
              <Route path="/" element={<AuctionList />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
