import React, { useState } from 'react';
import axios from 'axios';

const AuthTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const addResult = (test, success, message, data = null) => {
    setTestResults(prev => [...prev, { test, success, message, data, time: new Date().toLocaleTimeString() }]);
  };

  const runTests = async () => {
    setTestResults([]);
    setLoading(true);

    try {
      // Test 1: Check API URL
      addResult('API URL Check', true, `Using API URL: ${API_URL}`);

      // Test 2: Server Health Check
      try {
        await axios.get('http://localhost:5000');
        addResult('Server Health', true, 'Backend server is running');
      } catch (error) {
        addResult('Server Health', false, 'Backend server is NOT running - Start it first!');
        setLoading(false);
        return;
      }

      // Test 3: Register New User
      const randomNum = Math.floor(Math.random() * 10000);
      const testUser = {
        username: `testuser${randomNum}`,
        email: `test${randomNum}@example.com`,
        password: 'test123456'
      };

      try {
        const registerRes = await axios.post(`${API_URL}/auth/register`, testUser);
        addResult('Register', true, 'User registered successfully', {
          username: registerRes.data.data.username,
          email: registerRes.data.data.email,
          hasToken: !!registerRes.data.token
        });
        
        // Test 4: Login with correct credentials
        try {
          const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: testUser.email,
            password: testUser.password
          });
          addResult('Login (correct)', true, 'Login successful', {
            username: loginRes.data.data.username,
            hasToken: !!loginRes.data.token
          });

          // Test 5: Get Current User
          try {
            const meRes = await axios.get(`${API_URL}/auth/me`, {
              headers: { Authorization: `Bearer ${loginRes.data.token}` }
            });
            addResult('Get Me (protected)', true, 'Protected route accessible', {
              username: meRes.data.data.username
            });
          } catch (error) {
            addResult('Get Me (protected)', false, error.response?.data?.message || error.message);
          }

          // Test 6: Login with wrong password
          try {
            await axios.post(`${API_URL}/auth/login`, {
              email: testUser.email,
              password: 'wrongpassword'
            });
            addResult('Login (wrong pwd)', false, 'Should have rejected wrong password');
          } catch (error) {
            addResult('Login (wrong pwd)', true, 'Correctly rejected wrong password', {
              message: error.response?.data?.message
            });
          }

        } catch (error) {
          addResult('Login (correct)', false, error.response?.data?.message || error.message);
        }

      } catch (error) {
        addResult('Register', false, error.response?.data?.message || error.message);
      }

      // Test 7: Admin Login
      try {
        const adminRes = await axios.post(`${API_URL}/auth/login`, {
          email: 'admin@eventmanagement.com',
          password: 'admin123'
        });
        addResult('Admin Login', true, 'Admin login successful', {
          role: adminRes.data.data.role,
          username: adminRes.data.data.username
        });
      } catch (error) {
        addResult('Admin Login', false, error.response?.data?.message || 'Admin account not found - Run seed.js first');
      }

    } catch (error) {
      addResult('Test Suite', false, error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'monospace' }}>
      <h1 style={{ color: '#00d4ff' }}>🔐 Authentication API Test Suite</h1>
      <p style={{ color: '#a0aec0', marginBottom: '30px' }}>
        This page tests your login and signup functionality
      </p>

      <button 
        onClick={runTests} 
        disabled={loading}
        style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '30px'
        }}
      >
        {loading ? '⏳ Running Tests...' : '▶️ Run All Tests'}
      </button>

      <div style={{ background: '#1e2139', padding: '20px', borderRadius: '10px' }}>
        {testResults.length === 0 ? (
          <p style={{ color: '#a0aec0', textAlign: 'center' }}>Click the button to run tests</p>
        ) : (
          testResults.map((result, index) => (
            <div 
              key={index} 
              style={{
                background: '#151932',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '8px',
                borderLeft: `4px solid ${result.success ? '#00ff88' : '#ff4d4d'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '20px', marginRight: '10px' }}>
                    {result.success ? '✅' : '❌'}
                  </span>
                  <strong style={{ color: '#fff' }}>{result.test}</strong>
                </div>
                <span style={{ color: '#a0aec0', fontSize: '12px' }}>{result.time}</span>
              </div>
              <p style={{ color: result.success ? '#00ff88' : '#ff4d4d', marginLeft: '30px', marginTop: '5px' }}>
                {result.message}
              </p>
              {result.data && (
                <pre style={{ 
                  background: '#0a0e27', 
                  padding: '10px', 
                  borderRadius: '5px', 
                  marginLeft: '30px',
                  marginTop: '10px',
                  color: '#00d4ff',
                  fontSize: '12px',
                  overflow: 'auto'
                }}>
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              )}
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#1e2139', borderRadius: '10px' }}>
        <h3 style={{ color: '#00d4ff' }}>📋 Manual Testing Instructions:</h3>
        <ol style={{ color: '#a0aec0', lineHeight: '2' }}>
          <li>Make sure backend server is running on port 5000</li>
          <li>Go to <a href="/signup" style={{ color: '#4facfe' }}>/signup</a> page</li>
          <li>Fill in the form with:
            <ul>
              <li>Username: testuser123</li>
              <li>Email: test123@example.com</li>
              <li>Password: test123456</li>
              <li>Confirm Password: test123456</li>
            </ul>
          </li>
          <li>Click "Sign Up" - should redirect to home and show success toast</li>
          <li>Click "Logout" from navbar</li>
          <li>Go to <a href="/login" style={{ color: '#4facfe' }}>/login</a> page</li>
          <li>Login with the same credentials - should work</li>
          <li>Try admin login: admin@eventmanagement.com / admin123</li>
        </ol>
      </div>
    </div>
  );
};

export default AuthTest;
