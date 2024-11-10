import React, { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { AuthService } from '../services/auth';

interface LoginProps {
  onToggle: () => void;
}

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function Login({ onToggle }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    const result = AuthService.login(formData.email, formData.password);

    if (result.success) {
      window.location.reload();
    } else {
      setErrors({ password: result.error || 'Invalid credentials' });
    }

    setIsLoading(false);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your gaming account"
    >
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            error={errors.email}
            placeholder="john@example.com"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            error={errors.password}
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-gray-700"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-100">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <button
              type="button"
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
              onClick={() => alert('Password reset functionality would go here')}
            >
              Forgot your password?
            </button>
          </div>
        </div>

        <Button type="submit" isLoading={isLoading}>
          Sign in
        </Button>

        <p className="text-center text-sm text-blue-200">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onToggle}
            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Sign up
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}