function App() {
  // 1️⃣ Array of blog post objects
  const posts = [
    {
      id: 1,
      title: 'Understanding React State',
      author: 'Saicharan',
      published: '2025-08-05'
    },
    {
      id: 2,
      title: 'JSX vs HTML – Key Differences',
      author: 'React Learner',
      published: '2025-07-05'
    },
    {
      id: 3,
      title: 'Handling Events in React',
      author: 'Saicharan',
      published: '2025-06-05'
    }
  ];

  // 2️⃣ Render the posts using map()
  return (
    <div>
      <h1>Day 8: Rendering Object Lists 📝</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>By <strong>{post.author}</strong> on {post.published}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
