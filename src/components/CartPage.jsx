import { useCart } from "../context/CartContext";

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    setCurrentPage,
  } = useCart();

  return (
    <div className="page">
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-brand">
          <span className="nav-logo">👟</span>
          <span className="nav-title">SoleVibe</span>
        </div>
        <button className="back-btn" onClick={() => setCurrentPage("store")}>
          ← Continue Shopping
        </button>
      </header>

      <div className="cart-page">
        <h1>🛒 Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛍️</div>
            <p>Your cart is empty!</p>
            <button
              className="shop-now-btn"
              onClick={() => setCurrentPage("store")}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-emoji">{item.image}</div>
                  <div className="cart-item-details">
                    <div className="cart-item-brand">{item.brand}</div>
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-color">Color: {item.color}</div>
                  </div>
                  <div className="cart-item-controls">
                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
              <div className="summary-row">
                <span>Items ({totalItems})</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">FREE</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row total-row">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                className="proceed-btn"
                onClick={() => setCurrentPage("payment")}
              >
                Proceed to Payment →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
