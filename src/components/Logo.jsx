import React from 'react';
import logoImg from '../assets/logo.png';

export default function Logo({ size = 'md', className = '' }) {
  const imgHeight = {
    sm: 'h-9 sm:h-11',
    md: 'h-11 sm:h-14 md:h-16',
    lg: 'h-16 sm:h-20',
  }[size] || 'h-11 sm:h-14 md:h-16';

  return (
    <img 
      src={logoImg} 
      onError={(e) => { e.target.src = '/logo.png'; }}
      alt="Creative Living - Innovative Unique Design Concepts" 
      className={`${imgHeight} w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] ${className}`} 
    />
  );
}
