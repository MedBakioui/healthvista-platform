
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-md mx-auto text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Connexion</h1>
            <p className="text-gray-600">
              Connectez-vous à votre compte pour accéder à vos rendez-vous et consultations.
            </p>
          </div>
          
          <AuthForm initialTab="login" />
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              En vous connectant, vous acceptez nos{' '}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Conditions d'utilisation
              </Link>{' '}
              et notre{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Politique de confidentialité
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
