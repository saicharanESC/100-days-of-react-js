import { useQuery } from "@tanstack/react-query";

// fetch function
const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

// custom hook wrapping useQuery
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 2, // cache for 2 mins
    retry: 2, // retry twice if network fails
  });
}
