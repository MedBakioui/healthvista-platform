
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/auth/AuthForm';
import { Check, X } from 'lucide-react';

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    "Consultation en moins de 10 minutes",
    "Accessible 24h/24 et 7j/7",
    "Ordonnance électronique instantanée",
    "Remboursement Assurance Maladie"
  ];

  const limitations = [
    "Pas adapté aux urgences graves",
    "Certains examens nécessitent un déplacement",
    "Consultation limitée à 20 minutes"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Créez votre compte</h1>
                <p className="text-gray-600">
                  Rejoignez TéléSanté pour accéder à des consultations médicales en ligne, où que vous soyez.
                </p>
              </div>
              
              <AuthForm initialTab="register" />
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="glass-card p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Pourquoi choisir TéléSanté ?</h2>
                
                <div className="mb-8">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <Check className="h-4 w-4 text-green-600" />
                    </span>
                    Avantages
                  </h3>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2">
                      <X className="h-4 w-4 text-red-600" />
                    </span>
                    Limitations
                  </h3>
                  <ul className="space-y-2">
                    {limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start">
                        <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Déjà plus de 100 000 patients satisfaits. Rejoignez la communauté TéléSanté !
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600">
              En créant un compte, vous acceptez nos{' '}
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

export default Register;
