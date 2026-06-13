import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import type { Product, Category } from '../types';
import { catalogService } from '../services/api';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [products, cats] = await Promise.all([
          catalogService.getProducts(undefined, undefined, undefined, undefined, 1, 8),
          catalogService.getCategories(),
        ]);
        setFeaturedProducts(products.products);
        setCategories(cats);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Загрузка...</p>
      </Container>
    );
  }

  return (
    <div>
      <HeroSection />
      
      <Container className="my-5">
        <h2 className="text-center mb-4">Популярные категории</h2>
        <Row className="g-4">
          {categories.slice(0, 4).map((category) => (
            <Col key={category.id} xs={6} md={3}>
              <Card className="text-center h-100">
                <Card.Body>
                  <Link to={`/catalog?category=${category.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card.Title>{category.name}</Card.Title>
                    <Button variant="outline-primary">Перейти</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Популярные товары</h2>
          <Link to="/catalog">
            <Button variant="primary">Смотреть все</Button>
          </Link>
        </div>
        <Row className="g-4">
          {featuredProducts.map((product) => (
            <Col key={product.product_id} xs={6} md={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
