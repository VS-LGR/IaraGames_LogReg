import React, { useState } from 'react';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Store } from './pages/Store';
import { AuthService } from './services/auth';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const user = AuthService.getCurrentUser();

  if (user) {
    return <Store />;
  }

  return (
    <div className="min-h-screen">
      {isLogin ? (
        <Login onToggle={() => setIsLogin(false)} />
      ) : (
        <Register onToggle={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default App;