import React, { forwardRef } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label className="text-sm font-public-sans font-semibold text-on-surface/80">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 bg-surface-container-lowest rounded-md transition-colors
              focus:outline-none focus:ring-0
              ${error 
                ? 'text-error border-b-2 border-b-error' 
                : 'border border-outline-variant/20 focus:border-primary/50'
              }
            `}
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs font-public-sans font-medium text-error mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
