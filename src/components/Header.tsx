import { Navbar, Nav, Container, Badge, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

function Header() {
  const { cart } = useCart();
  const cartItemCount = cart?.total_items || 0;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/" className="fw-bold">NeoMarket</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/catalog">
              <Nav.Link href="/catalog">Каталог</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link href="/about">О нас</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Row className="mx-2" style={{ maxWidth: '500px', width: '100%' }}>
            <Col>
              <SearchBar />
            </Col>
          </Row>
          
          <Nav className="ms-lg-auto">
            <LinkContainer to="/wishlist">
              <Nav.Link href="/wishlist">Избранное</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link href="/cart" className="position-relative">
                Корзина
                {cartItemCount > 0 && (
                  <Badge className="position-absolute top-0 start-100 translate-middle bg-danger">
                    {cartItemCount}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/orders">
              <Nav.Link href="/orders">Заказы</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
