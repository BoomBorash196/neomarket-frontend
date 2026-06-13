import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Badge, Tab, Tabs, Spinner, Alert, Modal } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import { catalogService } from '../services/api';

function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;
      
      setLoading(true);
      setError(null);
      try {
        const data = await catalogService.getProduct(productId);
        setProduct(data);
      } catch (err) {
        setError('Товар не найден');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const userId = 'user123';

  const handleAddToCart = async () => {
    if (!product || !product.skus.length) return;
    
    try {
      const sku = product.skus[0];
      await addToCart(userId, { sku_id: sku.sku_id, quantity });
      setShowConfirmModal(true);
    } catch (err) {
      setError('Не удалось добавить товар в корзину');
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Загрузка товара...</p>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error || 'Товар не найден'}</Alert>
        <Button onClick={() => navigate('/catalog')}>Вернуться в каталог</Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Image
            src={product.images[selectedImage] || product.main_image_url || 'https://via.placeholder.com/600x600'}
            fluid
            rounded
          />
          {product.images.length > 1 && (
            <Row className="mt-3 g-2">
              {product.images.map((img, idx) => (
                <Col xs={3} key={idx}>
                  <Image
                    src={img}
                    thumbnail
                    fluid
                    onClick={() => setSelectedImage(idx)}
                    style={{ cursor: 'pointer', border: idx === selectedImage ? '2px solid #0d6efd' : 'none' }}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>

        <Col md={6}>
          <h1>{product.title}</h1>
          
          <div className="mb-3">
            <Badge bg={product.is_available ? 'success' : 'secondary'}>
              {product.is_available ? 'В наличии' : 'Нет в наличии'}
            </Badge>
          </div>

          <h2 className="text-primary mb-4">
            от {product.min_price.toLocaleString('ru-RU')} ₽
          </h2>

          <p className="lead">{product.description}</p>

          {Object.keys(product.characteristics).length > 0 && (
            <div className="mb-4">
              <h5>Характеристики:</h5>
              <table className="table">
                <tbody>
                  {Object.entries(product.characteristics).map(([key, value]) => (
                    <tr key={key}>
                      <td><strong>{key}</strong></td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mb-4">
            <label className="form-label">Количество:</label>
            <input
              type="number"
              className="form-control"
              min="1"
              max="99"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              style={{ width: '100px' }}
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleAddToCart}
            disabled={!product.is_available}
          >
            Добавить в корзину
          </Button>

          <Button
            variant="outline-secondary"
            size="lg"
            className="ms-2"
            onClick={() => navigate('/catalog')}
          >
            Продолжить покупки
          </Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Tabs defaultActiveKey="details" className="mb-3">
            <Tab eventKey="details" title="Описание">
              <p>{product.description}</p>
            </Tab>
            <Tab eventKey="specs" title="Характеристики">
              <table className="table">
                <tbody>
                  {Object.entries(product.characteristics).map(([key, value]) => (
                    <tr key={key}>
                      <td><strong>{key}</strong></td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab>
          </Tabs>
        </Col>
      </Row>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Товар добавлен в корзину</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{product.title} успешно добавлен в корзину.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Продолжить покупки
          </Button>
          <Button variant="primary" onClick={() => navigate('/cart')}>
            Перейти в корзину
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductPage;
