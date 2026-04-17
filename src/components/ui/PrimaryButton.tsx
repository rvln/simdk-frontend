import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function PrimaryButton({ children, className = '', disabled, ...props }: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        px-6 py-3 rounded-md font-public-sans font-semibold transition-all duration-300
        ${disabled 
          ? 'bg-surface-dim text-on-surface-variant cursor-not-allowed' 
          : 'bg-gradient-to-r from-primary to-primary-container text-white hover:scale-[1.02] hover:text-on-primary-fixed-variant hover:shadow-ambient'
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
