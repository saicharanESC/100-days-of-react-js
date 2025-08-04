import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    setMessage('');
    setUser(null);

    try {
      const res = await fetch('https://reqres.in/api/users/23'); // This will return 404

      if (res.status === 200) {
        const data = await res.json();
        setUser(data.data);
      } else if (res.status === 404) {
        setMessage('❌ User not found (404)');
      } else if (res.status === 401) {
        setMessage('🔒 Unauthorized (401)');
      } else if (res.status >= 500) {
        setMessage('💥 Server error. Please try again later.');
      } else {
        setMessage('Something went wrong.');
      }
    } catch (error) {
      setMessage('❌ Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Day 9: HTTP Status Code Demo</h1>
      <button onClick={fetchUser} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch User'}
      </button>

      {message && <p>{message}</p>}

      {user && (
        <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h3>{user.first_name} {user.last_name}</h3>
          <img src={user.avatar} alt="avatar" width={100} />
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;
