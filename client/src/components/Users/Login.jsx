import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });

      // Assuming the response contains the user role information
      const { token, role } = response.data; // Destructure the token and role from the response

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect to the desired page after successful login
      navigate('/');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <div className="container">
        <h2>Login</h2>
        <form className="mb-3" onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p>{error}</p>}
          <button type="submit" className="btn btn-primary">Login</button>
          <span>Not yet registered? <Link to ="/signup" style={{textDecoration:"none"}}>Register</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
