import { useState } from "react";
import { useCart } from "../context/CartContext";

function PaymentPage() {
  // useContext usage via useCart hook — reads from CartContext
  const { cartItems, totalPrice, clearCart, setCurrentPage } = useCart();

  const [form, setForm] = useState({
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  /* ── Helpers ── */
  const formatCardNumber = (val) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === "cardNumber") formatted = formatCardNumber(value);
    if (name === "expiry") formatted = formatExpiry(value);
    if (name === "cvv") formatted = value.replace(/\D/g, "").slice(0, 3);
    setForm((prev) => ({ ...prev, [name]: formatted }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ── Validation ── */
  const validate = () => {
    const newErrors = {};
    if (!form.cardHolder.trim())
      newErrors.cardHolder = "Cardholder name is required.";
    const rawCard = form.cardNumber.replace(/\s/g, "");
    if (rawCard.length !== 16)
      newErrors.cardNumber = "Enter a valid 16-digit card number.";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry))
      newErrors.expiry = "Enter a valid expiry date (MM/YY).";
    else {
      const [mm, yy] = form.expiry.split("/").map(Number);
      const now = new Date();
      const expDate = new Date(2000 + yy, mm - 1);
      if (mm < 1 || mm > 12 || expDate < now)
        newErrors.expiry = "Card has expired or invalid month.";
    }
    if (form.cvv.length !== 3)
      newErrors.cvv = "CVV must be exactly 3 digits.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address.";
    return newErrors;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    // Simulate payment processing
    await new Promise((res) => setTimeout(res, 2000));
    setLoading(false);
    setConfirmed(true);
    clearCart();
  };

  /* ── Order Confirmed Screen ── */
  if (confirmed) {
    return (
      <div className="page">
        <header className="navbar">
          <div className="nav-brand">
            <span className="nav-logo">👟</span>
            <span className="nav-title">SoleVibe</span>
          </div>
        </header>
        <div className="confirmation-page">
          <div className="confirmation-icon">✅</div>
          <h1>Order Confirmed!</h1>
          <p>
            Thank you, <strong>{form.cardHolder}</strong>! Your payment was
            successful and your order is on its way.
          </p>
          <p className="confirmation-email">
            A confirmation has been sent to <strong>{form.email}</strong>
          </p>
          <button
            className="shop-now-btn"
            onClick={() => setCurrentPage("store")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-brand">
          <span className="nav-logo">👟</span>
          <span className="nav-title">SoleVibe</span>
        </div>
        <button className="back-btn" onClick={() => setCurrentPage("cart")}>
          ← Back to Cart
        </button>
      </header>

      <div className="payment-page">
        <div className="payment-layout">
          {/* ── Left: Order Summary ── */}
          <div className="order-summary-panel">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <span className="order-item-emoji">{item.image}</span>
                  <div className="order-item-info">
                    <span className="order-item-name">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="order-item-brand">{item.brand}</span>
                  </div>
                  <span className="order-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* ── Right: Payment Form ── */}
          <div className="payment-form-panel">
            <h2>💳 Credit Card Payment</h2>
            <form onSubmit={handleSubmit} className="payment-form" noValidate>
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && (
                  <span className="error-msg">{errors.email}</span>
                )}
              </div>

              {/* Cardholder Name */}
              <div className="form-group">
                <label htmlFor="cardHolder">Cardholder Name</label>
                <input
                  id="cardHolder"
                  name="cardHolder"
                  type="text"
                  placeholder="John Doe"
                  value={form.cardHolder}
                  onChange={handleChange}
                  className={errors.cardHolder ? "input-error" : ""}
                />
                {errors.cardHolder && (
                  <span className="error-msg">{errors.cardHolder}</span>
                )}
              </div>

              {/* Card Number */}
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={handleChange}
                  className={errors.cardNumber ? "input-error" : ""}
                />
                {errors.cardNumber && (
                  <span className="error-msg">{errors.cardNumber}</span>
                )}
              </div>

              {/* Expiry + CVV row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiry">Expiry Date</label>
                  <input
                    id="expiry"
                    name="expiry"
                    type="text"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={handleChange}
                    className={errors.expiry ? "input-error" : ""}
                  />
                  {errors.expiry && (
                    <span className="error-msg">{errors.expiry}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    id="cvv"
                    name="cvv"
                    type="text"
                    placeholder="123"
                    value={form.cvv}
                    onChange={handleChange}
                    className={errors.cvv ? "input-error" : ""}
                  />
                  {errors.cvv && (
                    <span className="error-msg">{errors.cvv}</span>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="pay-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner" /> Processing Payment...
                  </span>
                ) : (
                  `Pay $${totalPrice.toFixed(2)}`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
