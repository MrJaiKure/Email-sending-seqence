import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/user/auth/login', { email, password });
      setToken(res.data.token);
      console.log(res)
      localStorage.setItem('token', res.data.token);
      navigate('/flow'); // 
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',width: '100vw', background: '#f0f2f5' }}>
  <div style={{ padding: '2rem', borderRadius: '10px', background: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '300px' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', background: '#4CAF50', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Login
      </button>
    </form>
    <p style={{ textAlign: 'center', marginTop: '1rem',color: '#4CAF50' }}>
      Don't have an account?{' '}
      <a href="/register" style={{ color: '#4CAF50', textDecoration: 'none', fontWeight: 'bold' }}>
        Register
      </a>
    </p>
  </div>
</div>

  );
}

export default Login;
