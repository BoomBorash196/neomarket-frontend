import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-vh-100 d-flex flex-column">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <footer className="bg-dark text-white text-center py-3 mt-auto">
            <Container>
              <p className="mb-0">&copy; 2026 NeoMarket. Все права защищены.</p>
            </Container>
          </footer>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;