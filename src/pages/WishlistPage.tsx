import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import type { WishlistItem } from '../types';
import { wishlistService } from '../services/api';

function WishlistPage() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = 'user123';

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const data = await wishlistService.getWishlist(userId);
        setWishlist(data);
      } catch (err) {
        setError('Ошибка загрузки избранного');
        console.error('Error loading wishlist:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  const handleRemove = async (productId: string) => {
    try {
      await wishlistService.removeFromWishlist(userId, productId);
      setWishlist(wishlist.filter(item => item.product_id !== productId));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(userId, { sku_id: productId, quantity: 1 });
      alert('Товар добавлен в корзину');
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Загрузка избранного...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (wishlist.length === 0) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="info">
          <h4>Список избранного пуст</h4>
          <p>Сохраняйте товары, которые вам нравятся, чтобы быстро найти их позже</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Избранное</h1>

      <Row className="g-4">
        {wishlist.map((item) => (
          <Col key={item.product_id} xs={12} md={6} lg={4}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={item.main_image_url || 'https://via.placeholder.com/300x300'}
                alt={item.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="fw-bold text-primary fs-5">
                  {item.min_price.toLocaleString('ru-RU')} ₽
                </Card.Text>
                <div className="mt-auto d-flex gap-2">
                  <Button
                    variant="primary"
                    className="flex-grow-1"
                    onClick={() => handleAddToCart(item.product_id)}
                    disabled={!item.is_available}
                  >
                    В корзину
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleRemove(item.product_id)}
                  >
                    Удалить
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default WishlistPage;
