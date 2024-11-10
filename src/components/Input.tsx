import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-blue-100">
        {label}
      </label>
      <input
        {...props}
        className={`
          appearance-none relative block w-full px-3 py-2
          bg-[#2a2b3d] border ${error ? 'border-red-500' : 'border-blue-500/30'}
          text-white placeholder-gray-400 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
        `}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}