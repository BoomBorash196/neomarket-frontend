import React from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { orderService } from '../services/api';
import type { Order } from '../types';

function OrdersPage() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderService.getOrders('user123');
        setOrders(data);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm('Вы уверены, что хотите отменить заказ?')) return;
    
    try {
      const updatedOrder = await orderService.cancelOrder('user123', orderId);
      setOrders(orders.map(o => o.order_id === orderId ? updatedOrder : o));
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Не удалось отменить заказ');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger'
    };
    return badges[status] || 'secondary';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: 'Ожидает обработки',
      processing: 'В обработке',
      shipped: 'Отправлен',
      delivered: 'Доставлен',
      cancelled: 'Отменён'
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Загрузка заказов...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Мои заказы</h1>

      {orders.length === 0 ? (
        <Alert variant="info">
          <h4>У вас пока нет заказов</h4>
          <p>Сделайте первую покупку и она появится здесь</p>
          <Link to="/catalog">
            <Button variant="primary">Перейти в каталог</Button>
          </Link>
        </Alert>
      ) : (
        <Row className="g-4">
          {orders.map((order) => (
            <Col key={order.order_id} xs={12}>
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Заказ #{order.order_id}</h5>
                  <span className={`badge bg-${getStatusBadge(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </Card.Header>
                <Card.Body>
                  <p className="mb-2">
                    <strong>Дата:</strong> {new Date(order.created_at).toLocaleDateString('ru-RU')}
                  </p>
                  <p className="mb-2">
                    <strong>Сумма:</strong> {order.total_amount.toLocaleString('ru-RU')} ₽
                  </p>
                  <hr />
                  <h6>Товары:</h6>
                  <ul className="list-unstyled mb-0">
                    {order.items.map((item: any, idx: number) => (
                      <li key={idx} className="d-flex justify-content-between">
                        <span>{item.product_title} × {item.quantity}</span>
                        <span>{item.price.toLocaleString('ru-RU')} ₽</span>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
                <Card.Footer>
                  <Button variant="outline-primary" size="sm">
                    Детали заказа
                  </Button>
                  {order.status === 'pending' && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleCancelOrder(order.order_id)}
                    >
                      Отменить заказ
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default OrdersPage;
