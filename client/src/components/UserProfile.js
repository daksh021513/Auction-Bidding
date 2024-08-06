import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userAuctions, setUserAuctions] = useState([]);
  const [userBids, setUserBids] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auctionsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/me/auctions`);
        const bidsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/me/bids`);
        setUserAuctions(auctionsResponse.data);
        setUserBids(bidsResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <h3>Your Auctions</h3>
      <ul>
        {userAuctions.map(auction => (
          <li key={auction._id}>{auction.title} - Current Bid: ${auction.currentBid}</li>
        ))}
      </ul>
      <h3>Your Bids</h3>
      <ul>
        {userBids.map(bid => (
          <li key={bid.auctionId}>
            Auction: {bid.auctionTitle} - Your Bid: ${bid.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
