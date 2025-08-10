import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);       // stores fetched users
  const [loading, setLoading] = useState(false);// loading indicator
  const [message, setMessage] = useState('');   // error / status messages

  // Fetch function we can call from useEffect or a button
  const fetchUsers = async (url = 'https://jsonplaceholder.typicode.com/users') => {
    setLoading(true);
    setMessage('');
    setUsers([]);

    try {
      const res = await fetch(url);

      // If response is not OK (not 2xx), set a helpful message
      if (!res.ok) {
        setMessage(`Error: ${res.status} ${res.statusText}`);
        return;
      }

      // Parse JSON only if response is OK
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      // Fetch throws here on network failures or CORS blocks
      setMessage('Network error (offline / CORS / DNS). Check DevTools Network tab.');
    } finally {
      setLoading(false);
    }
  };

  // Run once when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);


  

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Day 13: Fetching Real Data</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => fetchUsers() } disabled={loading}>
          {loading ? 'Loading...' : 'Refetch Users'}
        </button>

        {/* Quick test links to simulate different responses */}
        <button onClick={() => fetchUsers('https://reqres.in/api/users/23')} style={{ marginLeft: '0.5rem' }}>
          Test 404 (reqres)
        </button>
        <button onClick={() => fetchUsers('https://httpstat.us/500')} style={{ marginLeft: '0.5rem' }}>
          Test 500 (httpstat)
        </button>
      </div>

      {message && <p style={{ color: 'crimson' }}>{message}</p>}

      {users.length > 0 ? (
        <ul>
          {users.map((u) => (
            <li key={u.id ?? u.email ?? u.name}>
              {/* fields differ across APIs; use whichever exists */}
              <strong>{u.name ?? `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim()}</strong>
              <div style={{ fontSize: '0.9rem' }}>{u.email ?? u.username}</div>
            </li>
          ))}
        </ul>
      ) : !loading && !message ? (
        <p>No users to display.</p>
      ) : null}
    </div>
  );
}

export default App;
