import React from 'react';
import { ShoppingCart, LogOut } from 'lucide-react';
import { AuthService } from '../services/auth';
import { Button } from '../components/Button';

interface Game {
  id: string;
  title: string;
  developer: string;
  price: number;
  image: string;
  description: string;
}

const BRAZILIAN_GAMES: Game[] = [
  {
    id: '1',
    title: 'Horizon Chase Turbo',
    developer: 'Aquiris Game Studio',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2000',
    description: 'A racing game inspired by the great hits of the 80s and 90s.'
  },
  {
    id: '2',
    title: 'Dandara',
    developer: 'Long Hat House',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000',
    description: 'A Metroidvania platformer based on Brazilian folklore.'
  },
  {
    id: '3',
    title: 'Knights of Pen & Paper',
    developer: 'Behold Studios',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=2000',
    description: 'Turn-based RPG that simulates a tabletop game session.'
  }
];

export function Store() {
  const user = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  const handlePurchase = (gameId: string) => {
    alert('Purchase functionality would be implemented here!');
  };

  return (
    <div className="min-h-screen bg-[#1a1b2e]">
      {/* Navigation Bar */}
      <nav className="bg-[#2a2b3d]/95 backdrop-blur-lg border-b border-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                IaraGames Store
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-blue-200">
                Welcome, {user?.name}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-white mb-8">
          Featured Brazilian Games
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRAZILIAN_GAMES.map((game) => (
            <div
              key={game.id}
              className="bg-[#2a2b3d]/80 backdrop-blur-lg rounded-lg overflow-hidden border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                <p className="text-blue-300 text-sm mb-4">by {game.developer}</p>
                <p className="text-gray-300 mb-4 line-clamp-2">{game.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-400">
                    ${game.price.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => handlePurchase(game.id)}
                    className="!w-auto"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}