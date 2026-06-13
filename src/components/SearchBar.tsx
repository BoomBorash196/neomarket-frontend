import React, { useState, useEffect, useRef } from 'react';
import { Form, FormControl, InputGroup, ListGroup, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { catalogService } from '../services/api';
import type { Product } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faProduct, faTimes } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const navigate = useNavigate();
  const debounceRef = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const result = await catalogService.getProducts(undefined, query, undefined, undefined, 1, 5);
        setSuggestions(result.products);
      } catch (error) {
        console.error('Error loading suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(loadSuggestions, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
    setHighlightedIndex(-1);
    onSearch?.(e.target.value);
  };

  const handleSuggestionClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSuggestionClick(suggestions[highlightedIndex].product_id);
        } else if (suggestions.length > 0) {
          handleSuggestionClick(suggestions[0].product_id);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="position-relative">
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Поиск товаров..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          aria-label="Поиск товаров"
        />
        {query && (
          <button
            className="btn btn-outline-secondary border-start-0"
            onClick={handleClear}
            style={{ borderLeft: 'none' }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
        <button className="btn btn-outline-primary" type="button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </InputGroup>

      {showSuggestions && (suggestions.length > 0 || loading) && (
        <ListGroup
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: '400px',
            overflowY: 'auto',
          }}
          className="shadow-lg border-top"
        >
          {loading && (
            <ListGroup.Item className="text-center py-3">
              <small className="text-muted">Загрузка...</small>
            </ListGroup.Item>
          )}

          {!loading && suggestions.map((product, index) => (
            <ListGroup.Item
              key={product.product_id}
              action
              onClick={() => handleSuggestionClick(product.product_id)}
              active={index === highlightedIndex}
              className="d-flex align-items-center py-2"
            >
              <img
                src={product.main_image_url || 'https://via.placeholder.com/50'}
                alt={product.title}
                className="me-2 rounded"
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              />
              <div className="flex-grow-1">
                <div className="fw-medium text-truncate">{product.title}</div>
                <div className="text-primary fw-bold">
                  от {product.min_price.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              {!product.is_available && (
                <Badge bg="secondary">Нет в наличии</Badge>
              )}
            </ListGroup.Item>
          ))}

          {!loading && suggestions.length === 0 && query.length >= 2 && (
            <ListGroup.Item className="text-center py-3">
              <small className="text-muted">Ничего не найдено</small>
            </ListGroup.Item>
          )}
        </ListGroup>
      )}
    </div>
  );
}

export default SearchBar;
