import { useCart } from "../context/CartContext";

const shoes = [
  {
    id: 1,
    name: "Air Stride Pro",
    brand: "Nike",
    price: 129.99,
    image: "👟",
    color: "White/Black",
    description: "Lightweight running shoes with superior cushioning.",
  },
  {
    id: 2,
    name: "UltraBoost X",
    brand: "Adidas",
    price: 149.99,
    image: "👟",
    color: "Blue/White",
    description: "Energy-returning boost midsole for all-day comfort.",
  },
  {
    id: 3,
    name: "Classic Leather Hi",
    brand: "Reebok",
    price: 89.99,
    image: "👞",
    color: "White",
    description: "Timeless style meets modern comfort.",
  },
  {
    id: 4,
    name: "Air Force 1",
    brand: "Nike",
    price: 109.99,
    image: "👟",
    color: "Triple White",
    description: "Iconic silhouette that never goes out of style.",
  },
  {
    id: 5,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 69.99,
    image: "👟",
    color: "Black",
    description: "The original basketball shoe turned cultural icon.",
  },
  {
    id: 6,
    name: "Old Skool",
    brand: "Vans",
    price: 79.99,
    image: "👟",
    color: "Black/White",
    description: "Durable suede and canvas upper with the iconic sidestripe.",
  },
];

function ShoeStore() {
  const { addToCart, totalItems, setCurrentPage } = useCart();

  return (
    <div className="store">
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-brand">
          <span className="nav-logo">👟</span>
          <span className="nav-title">SoleVibe</span>
        </div>
        <button
          className="cart-btn"
          onClick={() => setCurrentPage("cart")}
        >
          🛒 Cart
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </button>
      </header>

      {/* Hero */}
      <section className="hero">
        <h1>Step Into Style</h1>
        <p>Discover premium footwear for every occasion</p>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <h2>Our Collection</h2>
        <div className="products-grid">
          {shoes.map((shoe) => (
            <div key={shoe.id} className="product-card">
              <div className="shoe-emoji">{shoe.image}</div>
              <div className="product-info">
                <span className="product-brand">{shoe.brand}</span>
                <h3 className="product-name">{shoe.name}</h3>
                <p className="product-color">Color: {shoe.color}</p>
                <p className="product-desc">{shoe.description}</p>
                <div className="product-footer">
                  <span className="product-price">
                    ${shoe.price.toFixed(2)}
                  </span>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(shoe)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ShoeStore;
