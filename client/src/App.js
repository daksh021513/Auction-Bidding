import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import AuctionList from './components/AuctionList';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      <h1>Auction Bidding App</h1>
      {!token ? (
        <div>
          <Register />
          <Login setToken={setToken} />
        </div>
      ) : (
        <AuctionList />
      )}
    </div>
  );
};

export default App;
