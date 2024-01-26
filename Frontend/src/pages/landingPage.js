import React, { useState, useEffect } from 'react';
import api from '../services/api';


const LandingPage = () => {
  const [activeSessions, setActiveSessions] = useState([]);


  useEffect(() => {
   
    const getActiveSessions = async () => {
      try {
        const response = api.fetchActiveSessions();
        console.log(response);
        setActiveSessions(response);

      } catch (error) {
        console.error('Error fetching active sessions:');
      }
    };
    getActiveSessions();
  }, []);



  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      <h2>Active Voting Sessions:</h2>
      <ul>
        {activeSessions.map(session => (
          <li key={session._id}>
            <p>Module Name: {session.module_name}</p>
            <p>Expiration Date: {session.expiration_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default LandingPage;