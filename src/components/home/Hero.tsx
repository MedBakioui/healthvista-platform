
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const benefits = [
    'Consultez un médecin en moins de 10 minutes',
    'Obtenez une ordonnance électronique',
    'Suivi médical personnalisé',
    'Remboursé par l'Assurance Maladie'
  ];

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-blue-50 to-transparent opacity-70"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-20 animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 animate-fade-in-up">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100">
              <span className="text-blue-600 text-sm font-medium">
                Service médical 24/7
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Votre médecin <span className="text-blue-500">en ligne</span>, à tout moment
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Consultez un médecin par vidéo ou chat, obtenez une ordonnance et soyez remboursé, le tout sans quitter votre domicile.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Link to="/register">
                <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Prendre rendez-vous
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300">
                  Comment ça marche
                </Button>
              </Link>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-1/2 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-3xl rotate-3 opacity-10"></div>
              <div className="absolute inset-0 bg-blue-500 rounded-3xl -rotate-3 opacity-10"></div>
              <div className="relative glass-card overflow-hidden rounded-3xl border border-white/40 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Consultation médicale en ligne" 
                  className="w-full h-auto object-cover rounded-3xl aspect-video" 
                />
                
                {/* Floating Elements */}
                <div className="absolute top-6 right-6 glass-effect rounded-xl p-4 shadow-lg backdrop-blur-xl animate-hover-float">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold">24 médecins disponibles</span>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 glass-effect rounded-xl p-4 shadow-lg backdrop-blur-xl max-w-xs animate-hover-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">97%</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Satisfaction client</p>
                      <p className="text-xs text-gray-600">Basé sur plus de 10 000 consultations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
