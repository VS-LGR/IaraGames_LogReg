import React from 'react';
import { Gamepad2 } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <Gamepad2 className="h-12 w-12 text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              IaraGames
            </h1>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">{title}</h2>
          <p className="mt-2 text-sm text-blue-200">{subtitle}</p>
        </div>

        {/* Auth Container */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-[0_0_15px_rgba(0,149,255,0.1)] p-8 border border-white/10">
          {children}
        </div>
      </div>
    </div>
  );
}