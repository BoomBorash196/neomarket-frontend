import React, { useEffect } from 'react';
import { Card, Button, Badge, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import type { Product } from '../types';
import { wishlistService } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart, loading } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const userId = 'user123';

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const items = await wishlistService.getWishlist(userId);
        setIsInWishlist(items.some(item => item.product_id === product.product_id));
      } catch (err) {
        console.error('Error checking wishlist:', err);
      }
    };
    checkWishlist();
  }, [product.product_id]);

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlistLoading(true);
    try {
      if (isInWishlist) {
        await wishlistService.removeFromWishlist(userId, product.product_id);
        setIsInWishlist(false);
      } else {
        await wishlistService.addToWishlist(userId, product.product_id);
        setIsInWishlist(true);
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAddToCart = async () => {
    setError(null);
    try {
      const sku = product.skus[0];
      if (sku && sku.active) {
        await addToCart(userId, { sku_id: sku.sku_id, quantity });
        setShowModal(false);
        setQuantity(1);
      }
    } catch (err) {
      setError('Не удалось добавить товар в корзину');
    }
  };

  const handleQuickView = () => {
    setShowModal(true);
  };

  return (
    <Card className="h-100">
      <div className="position-relative">
        <Link to={`/product/${product.product_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card.Img
            variant="top"
            src={product.main_image_url || 'https://via.placeholder.com/300x300?text=Нет+изображения'}
            alt={product.title}
            style={{ height: '200px', objectFit: 'cover' }}
          />
        </Link>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>{isInWishlist ? 'Удалить из избранного' : 'В избранное'}</Tooltip>}
        >
          <Button
            variant="link"
            className="position-absolute top-0 end-0 m-2 text-danger"
            style={{ zIndex: 10 }}
            onClick={handleToggleWishlist}
            disabled={wishlistLoading}
          >
            <FontAwesomeIcon 
              icon={isInWishlist ? faHeartSolid : faHeart} 
              size="lg"
              style={{ filter: isInWishlist ? 'none' : 'grayscale(100%)' }}
            />
          </Button>
        </OverlayTrigger>
      </div>
      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product.product_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card.Title className="text-truncate">{product.title}</Card.Title>
        </Link>
        <div className="mb-2">
          <Badge bg={product.is_available ? 'success' : 'secondary'}>
            {product.is_available ? 'В наличии' : 'Нет в наличии'}
          </Badge>
        </div>
        <Card.Text className="fw-bold text-primary fs-5">
          от {product.min_price.toLocaleString('ru-RU')} ₽
        </Card.Text>
        <div className="mt-auto">
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={handleQuickView}
            disabled={!product.is_available}
          >
            В корзину
          </Button>
        </div>
      </Card.Body>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{product.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={product.main_image_url || 'https://via.placeholder.com/300x300'}
            alt={product.title}
            className="img-fluid mb-3 rounded"
          />
          <p>{product.description}</p>
          <p className="fw-bold text-primary fs-4">
            от {product.min_price.toLocaleString('ru-RU')} ₽
          </p>
          
          {product.characteristics && Object.keys(product.characteristics).length > 0 && (
            <div className="mb-3">
              <h6>Характеристики:</h6>
              <ul className="list-unstyled">
                {Object.entries(product.characteristics).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {String(value)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Количество:</label>
            <input
              type="number"
              className="form-control"
              min="1"
              max="99"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Закрыть
          </Button>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            disabled={loading || !product.is_available}
          >
            {loading ? 'Добавление...' : 'Добавить в корзину'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default ProductCard;
