import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

function CartPage() {
  const { cart, loading, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const userId = 'user123';

  const handleRemove = async (cartItemId: number) => {
    try {
      await removeFromCart(userId, cartItemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleQuantityChange = async (cartItemId: number, newQuantity: number) => {
    try {
      await updateQuantity(userId, cartItemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
      try {
        await clearCart(userId);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading && !cart) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Загрузка корзины...</p>
      </Container>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="info">
          <h4>Ваша корзина пуста</h4>
          <p>Добавьте товары, чтобы продолжить покупки</p>
          <Link to="/catalog">
            <Button variant="primary">Перейти в каталог</Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Корзина</h1>

      <Table responsive striped hover>
        <thead>
          <tr>
            <th>Товар</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Сумма</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item.cart_item_id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={`https://via.placeholder.com/80x80?text=${item.product_title.charAt(0)}`}
                    alt={item.product_title}
                    className="me-3 rounded"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-0">{item.product_title}</h6>
                    <small className="text-muted">SKU: {item.sku_id}</small>
                  </div>
                </div>
              </td>
              <td>{item.sku_info.price.toLocaleString('ru-RU')} ₽</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max={item.sku_info.quantity_available}
                  value={item.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    handleQuantityChange(item.cart_item_id, value);
                  }}
                  style={{ width: '80px' }}
                />
              </td>
              <td>{item.subtotal.toLocaleString('ru-RU')} ₽</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemove(item.cart_item_id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="text-end fw-bold">Итого:</td>
            <td colSpan={2} className="fw-bold fs-5">
              {cart.total_amount.toLocaleString('ru-RU')} ₽ ({cart.total_items} шт.)
            </td>
          </tr>
        </tfoot>
      </Table>

      <div className="d-flex justify-content-between">
        <Link to="/catalog">
          <Button variant="secondary">Продолжить покупки</Button>
        </Link>
        <div>
          <Button variant="danger" onClick={handleClearCart} className="me-2">
            Очистить корзину
          </Button>
          <Button variant="primary" onClick={handleCheckout}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default CartPage;
