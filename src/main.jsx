import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* CartProvider wraps the entire application so Context is available everywhere */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
