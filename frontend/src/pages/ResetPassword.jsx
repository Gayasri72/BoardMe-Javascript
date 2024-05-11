import  { useState } from 'react';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const { id, token } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/reset-password/${id}/${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        // Password reset successful, redirect to login page or other page
        window.location.href = '/signin';
      } else {
        const data = await response.json();
        setError(data.message); // Set error message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.'); // Set generic error message
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ResetPassword;
