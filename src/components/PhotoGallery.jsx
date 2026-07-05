import useFetch from "../hooks/useFetch";

function PhotoGallery() {
  const {
    data: photos,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/photos?_limit=20");

  if (loading)
    return (
      <div className="loading">
        <div className="play-button">▶</div>
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="gallery">
      <h1>Photos</h1>

      <div className="grid">
        {photos.map((photo) => (
          <div key={photo.id} className="card">
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              width="150"
              height="150"
            />

            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;