import React from 'react';
import { SearchBar, Button } from '../../../shared/components';
import './Hero.css';

const Hero = ({ onSearch }) => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title">
              Descubre el sabor perfecto
              <span className="hero__title-highlight"> en cada receta</span>
            </h1>
            <p className="hero__description">
              Explora miles de recetas deliciosas de todo el mundo. Desde platos tradicionales 
              hasta creaciones modernas, encuentra tu próxima comida favorita.
            </p>
          </div>
          
          <div className="hero__search">
            <SearchBar 
              onSearch={onSearch}
              placeholder="¿Qué quieres cocinar hoy?"
              className="hero__search-bar"
            />
          </div>
          
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">1000+</span>
              <span className="hero__stat-label">Recetas</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">50+</span>
              <span className="hero__stat-label">Países</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-number">15</span>
              <span className="hero__stat-label">Categorías</span>
            </div>
          </div>
        </div>
        
        <div className="hero__visual">
          <div className="hero__floating-cards">
            <div className="hero__card hero__card--1">
              <span className="hero__card-emoji">🍝</span>
              <span className="hero__card-text">Pasta</span>
            </div>
            <div className="hero__card hero__card--2">
              <span className="hero__card-emoji">🍰</span>
              <span className="hero__card-text">Postres</span>
            </div>
            <div className="hero__card hero__card--3">
              <span className="hero__card-emoji">🥗</span>
              <span className="hero__card-text">Ensaladas</span>
            </div>
            <div className="hero__card hero__card--4">
              <span className="hero__card-emoji">🍲</span>
              <span className="hero__card-text">Sopas</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero__background">
        <div className="hero__gradient"></div>
        <div className="hero__pattern"></div>
      </div>
    </section>
  );
};

export default Hero;