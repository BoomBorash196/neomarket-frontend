import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
import type { Banner } from '../types';
import { homeService } from '../services/api';

function HeroSection() {
  const [banners, setBanners] = React.useState<Banner[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadBanners = async () => {
      try {
        const data = await homeService.getBanners();
        setBanners(data.filter(b => b.is_active).slice(0, 5));
      } catch (error) {
        console.error('Error loading banners:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBanners();
  }, []);

  if (loading) {
    return (
      <Container className="my-4">
        <div className="text-center">Загрузка...</div>
      </Container>
    );
  }

  if (banners.length === 0) {
    return (
      <Container className="my-4">
        <div className="text-center p-5 bg-light rounded">
          <h2>Добро пожаловать в NeoMarket!</h2>
          <p>Лучшие товары по лучшим ценам</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="my-4 px-0">
      <Carousel>
        {banners.map((banner) => (
          <Carousel.Item key={banner.id}>
            <img
              className="d-block w-100"
              src={banner.image_url}
              alt={banner.title}
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h3>{banner.title}</h3>
              {banner.link_url && (
                <a href={banner.link_url} className="btn btn-primary">
                  Подробнее
                </a>
              )}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default HeroSection;
