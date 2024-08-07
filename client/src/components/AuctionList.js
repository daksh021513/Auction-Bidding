// client/src/components/AuctionList.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import BidForm from './BidForm'; // Ensure this path is correct
import SearchBar from './SearchBar';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
    // Poll every 1 second
    const intervalId = setInterval(fetchAuctions, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

    // Filter auctions based on the search query
    const filteredAuctions = auctions.filter((auction) =>
      auction.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div>
      <h2>Auction List</h2>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul>
        {filteredAuctions.map((auction) => (
          <li key={auction._id}>
            <h3>{auction.title}</h3>
            <p>{auction.description}</p>
            <p>Starting Bid: ${auction.startingBid}</p>
            <p>Current Bid: ${auction.currentBid}</p>
            <p>Start Date: {new Date(auction.startDate).toLocaleString()}</p>
            <p>End Date: {new Date(auction.endDate).toLocaleString()}</p>
            <BidForm auctionId={auction._id} /> {/* Here is where BidForm is added */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionList;
