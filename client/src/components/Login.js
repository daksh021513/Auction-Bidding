// client/src/components/Login.js

import React, { useState } from 'react';
import api from '../api'; // Import your custom api module
import { useHistory } from 'react-router-dom'; 
import UserProfile from './UserProfile';

const Login = ({ setToken, setUserId }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', formData);
      const { token, userId } = response.data;
      // Assuming the API response returns a token and a userId
      setToken(token);
      setUserId(userId);
      alert('Login Successful')
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in');
    }
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
