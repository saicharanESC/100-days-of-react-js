import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async (page) => {
  const res = await fetch(`https://reqres.in/api/users?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

function PaginatedUsers() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
    keepPreviousData: true, // 👈 keeps old data while new page loads
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p style={{ color: "red" }}>{error.message}</p>;

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 500 }}>
      <h2>Paginated Users (Page {page})</h2>
      <ul>
        {data.data.map((user) => (
          <li key={user.id}>
            <img
              src={user.avatar}
              alt={user.first_name}
              width={40}
              style={{ borderRadius: "50%", marginRight: 8 }}
            />
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === data.total_pages}
          style={{ marginLeft: 8 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginatedUsers;
