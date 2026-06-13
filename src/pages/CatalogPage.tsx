import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Spinner, Alert, Pagination } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import type { Product, Category } from '../types';
import { catalogService } from '../services/api';

function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await catalogService.getCategories();
        setCategories(cats);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await catalogService.getProducts(
          selectedCategory,
          searchQuery,
          undefined,
          undefined,
          page,
          pageSize
        );
        setProducts(result.products);
        setTotal(result.total);
      } catch (err) {
        setError('Ошибка загрузки товаров');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(loadProducts, 300);
    return () => clearTimeout(debounce);
  }, [selectedCategory, searchQuery, page]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <Container className="my-4">
      <Row>
        <Col md={3}>
          <div className="sticky-top" style={{ top: '80px', zIndex: 1 }}>
            <h4>Категории</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Поиск</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Найти товар..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Категория</Form.Label>
                <Form.Select
                  value={selectedCategory || ''}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value || undefined);
                    setPage(1);
                  }}
                >
                  <option value="">Все категории</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </div>
        </Col>

        <Col md={9}>
          <h3 className="mb-4">Каталог товаров</h3>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          {loading && products.length === 0 ? (
            <div className="text-center mt-5">
              <Spinner animation="border" />
              <p className="mt-2">Загрузка товаров...</p>
            </div>
          ) : products.length === 0 ? (
            <Alert variant="info">Товары не найдены</Alert>
          ) : (
            <>
              <Row className="g-4">
                {products.map((product) => (
                  <Col key={product.product_id} xs={6} md={4} lg={3}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              {totalPages > 1 && (
                <Pagination className="justify-content-center mt-4">
                  <Pagination.Prev
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  />
                  {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === page}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  />
                </Pagination>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CatalogPage;
