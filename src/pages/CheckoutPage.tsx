import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/api';

interface AddressForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  postalCode: string;
}

interface DeliveryOptions {
  id: string;
  name: string;
  price: number;
  days: string;
}

const deliveryOptions: DeliveryOptions[] = [
  { id: 'standard', name: 'Стандартная доставка', price: 500, days: '3-5 дней' },
  { id: 'express', name: 'Экспресс доставка', price: 1000, days: '1-2 дня' },
  { id: 'pickup', name: 'Самовывоз', price: 0, days: '1 день' },
];

const paymentOptions = [
  { id: 'card', name: 'Банковской картой', description: 'Visa, MasterCard, МИР' },
  { id: 'cash', name: 'Наличными при получении', description: 'При доставке или в пункте выдачи' },
  { id: 'sbp', name: 'СБП (Система быстрых платежей)', description: 'Мгновенный перевод' },
];

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const userId = 'user123';

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderCreated, setOrderCreated] = useState<string | null>(null);

  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [address, setAddress] = useState<AddressForm>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    country: 'Россия',
    city: '',
    street: '',
    building: '',
    apartment: '',
    postalCode: '',
  });

  const [errors, setErrors] = useState<Partial<AddressForm>>({});

  const delivery = deliveryOptions.find(d => d.id === deliveryMethod);
  const payment = paymentOptions.find(p => p.id === paymentMethod);

  const subtotal = cart?.total_amount || 0;
  const deliveryPrice = delivery?.price || 0;
  const total = subtotal + deliveryPrice;

  const validateForm = (): boolean => {
    const newErrors: Partial<AddressForm> = {};

    if (!address.firstName.trim()) newErrors.firstName = 'Введите имя';
    if (!address.lastName.trim()) newErrors.lastName = 'Введите фамилию';
    if (!address.phone.trim()) newErrors.phone = 'Введите телефон';
    else if (!/^\+?[\d\s-]{10,}$/.test(address.phone)) newErrors.phone = 'Некорректный номер';
    if (!address.email.trim()) newErrors.email = 'Введите email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) newErrors.email = 'Некорректный email';
    if (!address.city.trim()) newErrors.city = 'Введите город';
    if (!address.street.trim()) newErrors.street = 'Введите улицу';
    if (!address.building.trim()) newErrors.building = 'Введите дом';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddressChange = (field: keyof AddressForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleBackToStep1 = () => {
    setStep(1);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!cart || cart.items.length === 0) {
        throw new Error('Корзина пуста');
      }

      const orderItems = cart.items.map(item => ({
        product_id: item.product_id,
        product_title: item.product_title,
        sku_id: item.sku_id,
        quantity: item.quantity,
        price: item.sku_info.price,
      }));

      const orderData = {
        user_id: userId,
        items: orderItems,
        delivery_method: deliveryMethod,
        delivery_address: {
          ...address,
          full_address: `${address.country}, ${address.city}, ул. ${address.street}, д. ${address.building}${address.apartment ? `, кв. ${address.apartment}` : ''}`,
        },
        payment_method: paymentMethod,
        total_amount: total,
      };

      const order = await orderService.createOrder(userId, orderItems);

      await clearCart(userId);
      setOrderCreated(order.order_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при оформлении заказа');
    } finally {
      setLoading(false);
    }
  };

  if (orderCreated) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="text-center p-5">
              <div className="mb-4">
                <span className="display-1">✅</span>
              </div>
              <h2 className="mb-3">Заказ успешно оформлен!</h2>
              <p className="lead mb-4">
                Номер вашего заказа: <strong className="text-primary">{orderCreated}</strong>
              </p>
              <p className="text-muted mb-4">
                Мы отправили подтверждение на ваш email. Вы можете отслеживать статус заказа в разделе "Мои заказы".
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Button variant="primary" onClick={() => navigate('/orders')}>
                  Мои заказы
                </Button>
                <Button variant="outline-primary" onClick={() => navigate('/catalog')}>
                  Продолжить покупки
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Оформление заказа</h1>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {/* Прогресс-бар */}
      <Row className="mb-4">
        <Col>
          <nav aria-label="progress">
            <ol className="breadcrumb">
              <li className={`breadcrumb-item ${step >= 1 ? 'active' : ''}`}>
                {step >= 1 ? <strong>1. Адрес</strong> : '1. Адрес'}
              </li>
              <li className="breadcrumb-item">
                {step >= 2 ? <strong>2. Подтверждение</strong> : '2. Подтверждение'}
              </li>
            </ol>
          </nav>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {step === 1 && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">📍 Контактные данные и адрес доставки</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Имя *</Form.Label>
                      <Form.Control
                        type="text"
                        value={address.firstName}
                        onChange={handleAddressChange('firstName')}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Фамилия *</Form.Label>
                      <Form.Control
                        type="text"
                        value={address.lastName}
                        onChange={handleAddressChange('lastName')}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Телефон *</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={address.phone}
                        onChange={handleAddressChange('phone')}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="example@mail.ru"
                        value={address.email}
                        onChange={handleAddressChange('email')}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <hr />

                <h6 className="mb-3">Адрес доставки</h6>

                <Form.Group className="mb-3">
                  <Form.Label>Страна</Form.Label>
                  <Form.Control
                    type="text"
                    value={address.country}
                    onChange={handleAddressChange('country')}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Город *</Form.Label>
                      <Form.Control
                        type="text"
                        value={address.city}
                        onChange={handleAddressChange('city')}
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Индекс</Form.Label>
                      <Form.Control
                        type="text"
                        value={address.postalCode}
                        onChange={handleAddressChange('postalCode')}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Улица *</Form.Label>
                  <Form.Control
                    type="text"
                    value={address.street}
                    onChange={handleAddressChange('street')}
                    isInvalid={!!errors.street}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.street}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Дом *</Form.Label>
                      <Form.Control
                        type="text"
                        value={address.building}
                        onChange={handleAddressChange('building')}
                        isInvalid={!!errors.building}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.building}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Квартира / Офис</Form.Label>
                      <Form.Control
                        type="text"
                        value={address.apartment}
                        onChange={handleAddressChange('apartment')}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-4">
                  <Button variant="primary" size="lg" onClick={handleNextStep}>
                    Далее: Способ доставки
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">📦 Способ доставки</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  {deliveryOptions.map((option) => (
                    <ListGroup.Item
                      key={option.id}
                      action
                      active={deliveryMethod === option.id}
                      onClick={() => setDeliveryMethod(option.id)}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <div className="fw-bold">{option.name}</div>
                        <small className="text-muted">{option.days}</small>
                      </div>
                      <div className="text-end">
                        {option.price === 0 ? (
                          <span className="text-success fw-bold">Бесплатно</span>
                        ) : (
                          <span className="fw-bold">{option.price.toLocaleString('ru-RU')} ₽</span>
                        )}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <div className="mt-4 d-flex gap-3">
                  <Button variant="outline-secondary" onClick={handleBackToStep1}>
                    Назад
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setStep(3)}>
                    Далее: Оплата
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">💳 Способ оплаты</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  {paymentOptions.map((option) => (
                    <ListGroup.Item
                      key={option.id}
                      action
                      active={paymentMethod === option.id}
                      onClick={() => setPaymentMethod(option.id)}
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div>
                        <div className="fw-bold">{option.name}</div>
                        <small className="text-muted">{option.description}</small>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <div className="mt-4 d-flex gap-3">
                  <Button variant="outline-secondary" onClick={() => setStep(2)}>
                    Назад
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => setStep(4)}>
                    Далее: Подтверждение
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">✅ Подтверждение заказа</h5>
              </Card.Header>
              <Card.Body>
                {cart && cart.items.length > 0 && (
                  <>
                    <h6 className="mb-3">Товары:</h6>
                    <ListGroup className="mb-4">
                      {cart.items.map((item) => (
                        <ListGroup.Item key={item.cart_item_id} className="d-flex justify-content-between">
                          <div>
                            <strong>{item.product_title}</strong>
                            <br />
                            <small className="text-muted">
                              {item.quantity} × {item.sku_info.price.toLocaleString('ru-RU')} ₽
                            </small>
                          </div>
                          <strong>{item.subtotal.toLocaleString('ru-RU')} ₽</strong>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>

                    <hr />

                    <h6 className="mb-3">Адрес доставки:</h6>
                    <p className="mb-3">
                      {address.firstName} {address.lastName}<br />
                      {address.phone}<br />
                      {address.email}<br />
                      {address.country}, {address.city}, ул. {address.street}, д. {address.building}
                      {address.apartment ? `, кв. ${address.apartment}` : ''}
                    </p>

                    <hr />

                    <h6 className="mb-3">Доставка:</h6>
                    <p className="mb-3">
                      <strong>{delivery?.name}</strong> — {delivery?.days}
                      <br />
                      {deliveryPrice === 0 ? (
                        <span className="text-success">Бесплатно</span>
                      ) : (
                        `${deliveryPrice.toLocaleString('ru-RU')} ₽`
                      )}
                    </p>

                    <hr />

                    <h6 className="mb-3">Оплата:</h6>
                    <p className="mb-3">{payment?.name}</p>

                    <hr />

                    <h5 className="d-flex justify-content-between mb-4">
                      <span>Итого:</span>
                      <span className="text-primary">{total.toLocaleString('ru-RU')} ₽</span>
                    </h5>

                    {loading ? (
                      <div className="text-center py-4">
                        <Spinner animation="border" />
                        <p className="mt-2">Обработка заказа...</p>
                      </div>
                    ) : (
                      <div className="d-flex gap-3">
                        <Button variant="outline-secondary" onClick={() => setStep(3)}>
                          Назад
                        </Button>
                        <Button
                          variant="success"
                          size="lg"
                          className="flex-grow-1"
                          onClick={handlePlaceOrder}
                        >
                          Подтвердить заказ
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '100px' }}>
            <Card.Header>
              <h5 className="mb-0">Краткая информация</h5>
            </Card.Header>
            <Card.Body>
              {cart && cart.items.length > 0 && (
                <>
                  <p className="mb-2 d-flex justify-content-between">
                    <span>Товары ({cart.total_items} шт.):</span>
                    <strong>{subtotal.toLocaleString('ru-RU')} ₽</strong>
                  </p>
                  <p className="mb-2 d-flex justify-content-between">
                    <span>Доставка:</span>
                    <strong>
                      {deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice.toLocaleString('ru-RU')} ₽`}
                    </strong>
                  </p>
                  <hr />
                  <p className="mb-0 d-flex justify-content-between fs-5">
                    <span>Итого:</span>
                    <strong className="text-primary">{total.toLocaleString('ru-RU')} ₽</strong>
                  </p>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutPage;
