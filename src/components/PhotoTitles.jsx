import useFetch from "../hooks/useFetch";

function PhotoTitles() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=5"
  );

  if (loading) return <p>Loading titles...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>First 5 Photo Titles</h2>

      <ul style={{ listStyle: "none" }}>
        {data.map((photo) => (
          <li key={photo.id}>{photo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PhotoTitles;