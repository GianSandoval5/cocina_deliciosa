import React from 'react';
import './Loading.css';

const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClass = `loading-spinner--${size}`;
  const colorClass = `loading-spinner--${color}`;
  
  return (
    <div className={`loading-spinner ${sizeClass} ${colorClass}`}>
      <div className="loading-spinner__circle"></div>
    </div>
  );
};

const LoadingSkeleton = ({ width = '100%', height = '1rem', className = '' }) => {
  return (
    <div 
      className={`loading-skeleton ${className}`}
      style={{ width, height }}
    />
  );
};

const LoadingCard = () => {
  return (
    <div className="loading-card">
      <LoadingSkeleton height="200px" className="loading-card__image" />
      <div className="loading-card__content">
        <LoadingSkeleton height="1.5rem" width="80%" />
        <LoadingSkeleton height="1rem" width="60%" />
        <LoadingSkeleton height="1rem" width="40%" />
      </div>
    </div>
  );
};

const LoadingGrid = ({ count = 6 }) => {
  return (
    <div className="loading-grid">
      {Array.from({ length: count }, (_, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  );
};

export { LoadingSpinner, LoadingSkeleton, LoadingCard, LoadingGrid };