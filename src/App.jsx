import "./App.css";
import { useCart } from "./context/CartContext";
import ShoeStore from "./components/ShoeStore";
import CartPage from "./components/CartPage";
import PaymentPage from "./components/PaymentPage";

function App() {
  // useContext usage: reading currentPage from CartContext
  const { currentPage } = useCart();

  return (
    <>
      {currentPage === "store" && <ShoeStore />}
      {currentPage === "cart" && <CartPage />}
      {currentPage === "payment" && <PaymentPage />}
    </>
  );
}

export default App;
