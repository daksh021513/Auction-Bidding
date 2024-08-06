import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auctions/${id}`);
        setAuction(response.data);
      } catch (error) {
        console.error('Error fetching auction details:', error);
      }
    };

    fetchAuction();
  }, [id]);

  const handleBid = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auctions/${id}/bid`, {
        amount: bidAmount,
        userId: 'user-id-placeholder', // Replace with actual user ID
      });
      setAuction(response.data);
      alert('Bid placed successfully!');
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid.');
    }
  };

  if (!auction) return <div>Loading...</div>;

  return (
    <div>
      <h2>{auction.title}</h2>
      <p>{auction.description}</p>
      <p>Starting Bid: ${auction.startingBid}</p>
      <p>Current Bid: ${auction.currentBid}</p>
      <h3>Bid History</h3>
      <ul>
        {auction.bidHistory.map((bid, index) => (
          <li key={index}>
            {bid.amount} by {bid.userId} at {new Date(bid.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter your bid"
      />
      <button onClick={handleBid}>Place Bid</button>
    </div>
  );
};

export default AuctionDetails;
