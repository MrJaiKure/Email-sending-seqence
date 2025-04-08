import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user/auth/register', { email, password });
      alert('Registered successfully! Now login.');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <input  placeholder=" Confirm Password"   />

        <br />
        <button type="submit">Register</button>
      </form>
      <button><a href="/login">Login</a> </button>
    </div>
  );
}

export default Register;
