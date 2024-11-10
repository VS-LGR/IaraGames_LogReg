import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({ children, isLoading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        group relative w-full flex justify-center py-3 px-4 border border-transparent
        text-sm font-medium rounded-lg text-white
        bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200 transform hover:scale-[1.02]
        shadow-[0_0_15px_rgba(0,149,255,0.1)]
        ${props.className || ''}
      `}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}