// client/src/components/AuctionList.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import BidForm from './BidForm'; // Ensure this path is correct

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await api.get('/auctions');
        setAuctions(response.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div>
      <h2>Auction List</h2>
      <ul>
        {auctions.map((auction) => (
          <li key={auction._id}>
            <h3>{auction.title}</h3>
            <p>{auction.description}</p>
            <p>Starting Bid: ${auction.startingBid}</p>
            <p>Current Bid: ${auction.currentBid}</p>
            <BidForm auctionId={auction._id} /> {/* Here is where BidForm is added */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionList;
