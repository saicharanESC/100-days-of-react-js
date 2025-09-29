import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async (page) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=3`
  );
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

function App() {
  const [page, setPage] = useState(1);

  // Fetch users by page
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["users", page], // cache per page
    queryFn: () => fetchUsers(page),
    keepPreviousData: true, // keep old page data while fetching new
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>👥 Paginated Users (React Query)</h2>

      {isLoading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      {data && (
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              <b>{user.name}</b> ({user.email})
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          ⬅ Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>Next ➡</button>
      </div>

      {isFetching && <p>Fetching new data…</p>}
    </div>
  );
}

export default App;
