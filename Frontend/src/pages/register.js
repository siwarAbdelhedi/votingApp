import React, { useState } from 'react';
import api from '../services/api';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(1);
  const handleRegister = async () => {
    try {
        console.log('console1');
      const response = await api.register({
        email: email,
        password: password,
        role: role,
      });

      console.log('Registration successful:', response);
      setEmail('');
      setPassword('');
      setRole(1);
      window.location.href = '/';

    } catch (error) {
      console.error('Registration failed:');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <label>Email:</label>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />

      <label>Role:</label>
      <select onChange={(e) => setRole(Number(e.target.value))}>
        <option value={1}>User</option>
        <option value={0}>Admin</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;

