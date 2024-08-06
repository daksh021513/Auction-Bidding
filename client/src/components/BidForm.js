// client/src/components/BidForm.js
import React, { useState } from 'react';
import api from '../api';

const BidForm = ({ auctionId }) => {
  const [bidAmount, setBidAmount] = useState('');

  const handleBid = async (e) => {
    e.preventDefault();
    try {
      // Sending the bid amount to the server with auctionId
      const response = await api.post(`/auctions/${auctionId}/bid`, { amount: bidAmount });
      alert(response.data.message || 'Bid placed successfully!');
    } catch (error) {
      console.error('Error placing bid:', error.response.data || error.message);
      alert('Error placing bid');
    }
  };

  return (
    <form onSubmit={handleBid}>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Your Bid"
        required
      />
      <button type="submit">Place Bid</button>
    </form>
  );
};

export default BidForm;
