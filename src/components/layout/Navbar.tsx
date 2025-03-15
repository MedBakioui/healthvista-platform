
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Calendar, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Médecins', path: '/doctors' },
    { name: 'Comment ça marche', path: '/how-it-works' },
    { name: 'Tarifs', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-blue-600 transition-all duration-300 hover:opacity-80"
          >
            <Video className="h-8 w-8" />
            <span>TéléSanté</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Connexion</span>
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Prendre RDV</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] glass-effect flex flex-col animate-fade-in">
          <div className="flex flex-col space-y-2 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-3 rounded-lg text-lg font-medium transition-all ${
                  location.pathname === link.path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-gray-200 my-4" />
            <Link
              to="/login"
              className="px-4 py-3 rounded-lg text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Connexion</span>
            </Link>
            <Link
              to="/register"
              className="px-4 py-3 rounded-lg text-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center justify-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="h-5 w-5" />
              <span>Prendre RDV</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
