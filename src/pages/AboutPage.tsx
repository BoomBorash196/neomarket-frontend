import { Container, Row, Col } from 'react-bootstrap';

function AboutPage() {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="mb-4">О NeoMarket</h1>
          
          <p className="lead">
            NeoMarket — современный маркетплейс, объединяющий лучших продавцов и довольных покупателей.
          </p>

          <h3 className="mt-4">Наша миссия</h3>
          <p>
            Мы создаём удобную и безопасную среду для онлайн-торговли, где каждый продавец может 
            найти своих клиентов, а каждый покупатель — лучшие товары по справедливым ценам.
          </p>

          <h3 className="mt-4">Преимущества</h3>
          <ul>
            <li>Широкий ассортимент товаров от проверенных продавцов</li>
            <li>Безопасная оплата и быстрая доставка</li>
            <li>Удобный личный кабинет покупателя и продавца</li>
            <li>Служба поддержки 24/7</li>
            <li>Система отзывов и рейтингов</li>
          </ul>

          <h3 className="mt-4">Команда проекта</h3>
          <p>
            Проект разработан командой <strong>QA Corps</strong> (Синдикат потерянных) в рамках обучения.
          </p>

          <hr className="my-4" />

          <h3>Контакты</h3>
          <p>
            По всем вопросам обращайтесь:
            <br />
            Email: support@neomarket.example
            <br />
            Телефон: +7 (XXX) XXX-XX-XX
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;
