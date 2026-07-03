import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check network status first
    if (!navigator.onLine) {
      setError(true);
      setLoading(false);
      return;
    }

    // Simulate API fetch
    setTimeout(() => {
      const success = true; // change to false to test error screen
      if (success) {
        setPhotos([
          { color: "#b4e197", text: "accusamus beatae ad facilis cum similique" },
          { color: "#8b00ff", text: "reprehenderit est deserunt velit ipsam" },
          { color: "#00ff80", text: "officia porro iure quia iusto qui ipsa ut n" },
          { color: "#ff5b8f", text: "culpa odio esse rerum omnis laboriosam" },
          { color: "#ff7fa3", text: "natus nisi omnis corporis facere molest" },
          { color: "#0047ff", text: "accusamus ea aliquid et amet sequi nerr" },
          { color: "#b4ffe6", text: "officia delectus consequatur vero aut ve" },
          { color: "#8b00ff", text: "aut porro officiis laborum odit ea laudar" },
          { color: "#b4e197", text: "reprehenderit est deserunt velit ipsam" },
          { color: "#0e5723", text: "natus nisi omnis corporis facere molest" },
          { color: "#d95192", text: "officia porro iure quia iusto qui ipsa ut n" },
          { color: "#b4e197", text: "aut porro officiis laborum odit ea laudar" },
          { color: "#0e8a81", text: "accusamus ea aliquid et amet sequi nerr" },
          { color: "#2a7dbc", text: "natus nisi omnis corporis facere molest" },
          { color: "#9faf88", text: "aut porro officiis laborum odit ea laudar" },
          { color: "#ff104c", text: "accusamus ea aliquid et amet sequi nerr" },
          { color: "#b4e197", text: "natus nisi omnis corporis facere molest" },
          { color: "#610e0e", text: "lorofficia porro iure quia iusto qui ipsa ut nem" },

        ]);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    }, 2000);
  }, []);

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
        <p>Error: Failed to fetch</p>
      </div>
    );

  return (
    <div className="gallery">
      <h1>Photos</h1>
      <div className="grid">
        {photos.map((p, i) => (
          <div key={i} className="card" style={{ backgroundColor: p.color }}>
            <div className="placeholder">600 x 600</div>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
