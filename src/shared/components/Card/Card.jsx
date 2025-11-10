import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'md',
  ...props 
}) => {
  const baseClass = 'card';
  const hoverClass = hover ? 'card--hover' : '';
  const paddingClass = `card--padding-${padding}`;
  
  const classes = [baseClass, hoverClass, paddingClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;