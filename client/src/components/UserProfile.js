// client/src/components/UserProfile.js

import React, { useState, useEffect } from 'react';
import api from '../api';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [userAuctions, setUserAuctions] = useState([]);
  const [userBids, setUserBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError('User ID is missing');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching user data for ID:', userId); // Debugging log
  
        const userResponse = await api.get(`/users/profile/${userId}`);
        console.log('User profile data:', userResponse.data); // Debug response
  
        const auctionsResponse = await api.get(`/users/${userId}/auctions`);
        console.log('User auctions data:', auctionsResponse.data); // Debug response
  
        const bidsResponse = await api.get(`/users/${userId}/bids`);
        console.log('User bids data:', bidsResponse.data); // Debug response
  
        setUser(userResponse.data);
        setUserAuctions(auctionsResponse.data);
        setUserBids(bidsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>No user data available</p>
      )}

      <h3>Your Auctions</h3>
      {userAuctions.length > 0 ? (
        <ul>
          {userAuctions.map((auction) => (
            <li key={auction._id}>
              <p>Title: {auction.title}</p>
              <p>Description: {auction.description}</p>
              <p>Starting Bid: ${auction.startingBid}</p>
              <p>Current Bid: ${auction.currentBid}</p>
              <p>Start Date: {new Date(auction.startDate).toLocaleString()}</p>
              <p>End Date: {new Date(auction.endDate).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not created any auctions yet.</p>
      )}

      <h3>Bid History</h3>
      {userBids.length > 0 ? (
        <ul>
          {userBids.map((bid, index) => (
            <li key={index}>
              <p>Auction: {bid.auctionId?.title || 'Unknown Auction'}</p>
              <p>Bid Amount: ${bid.amount}</p>
              <p>Date: {new Date(bid.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not placed any bids yet.</p>
      )}
    </div>
  );
};

export default UserProfile;
