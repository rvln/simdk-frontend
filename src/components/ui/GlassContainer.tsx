import React from 'react';

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function GlassContainer({ children, className = '', as: Component = 'div' }: GlassContainerProps) {
  return (
    <Component
      className={`bg-surface/80 backdrop-blur-md shadow-ambient rounded-xl border border-outline-variant/15 ${className}`}
    >
      {children}
    </Component>
  );
}
