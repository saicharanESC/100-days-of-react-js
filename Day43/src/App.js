import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchUsers = async ({ pageParam = 1 }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users?_page=${pageParam}&_limit=3`
  );
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

function App() {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage, allPages) => {
      // JSONPlaceholder has only 10 users, so stop at page 4
      const nextPage = allPages.length + 1;
      return nextPage <= 4 ? nextPage : undefined;
    },
  });

  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div style={{ padding: 20 }}>
      <h2>👥 Infinite Scroll Users (React Query)</h2>

      {isLoading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      {data?.pages.map((page, i) => (
        <ul key={i}>
          {page.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      ))}

      <div ref={observerRef} style={{ height: 20, margin: 20 }}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Scroll down to load more"
          : "No more users"}
      </div>
    </div>
  );
}

export default App;
