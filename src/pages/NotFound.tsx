
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container-custom text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-8xl font-bold text-blue-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page non trouvée</h2>
            <p className="text-gray-600 mb-8">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <Link to="/">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Home className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
