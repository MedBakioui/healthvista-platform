
import { Link } from 'react-router-dom';
import { Heart, Mail, MapPin, Phone, Video } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600 mb-4">
              <Video className="h-6 w-6" />
              <span>TéléSanté</span>
            </Link>
            <p className="text-gray-600 mb-6">
              Consultez un médecin à distance, en toute simplicité, où que vous soyez.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Liens rapides</h3>
            <ul className="space-y-3">
              {['Accueil', 'Médecins', 'Comment ça marche', 'Tarifs', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item === 'Accueil' ? '' : item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-600 hover:text-blue-600 animated-underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Ressources</h3>
            <ul className="space-y-3">
              {['FAQ', 'Support', 'Blog', 'Témoignages', 'Conditions générales'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-600 hover:text-blue-600 animated-underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                <span className="text-gray-600">123 Avenue de la Santé, 75001 Paris, France</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <a href="tel:+33123456789" className="text-gray-600 hover:text-blue-600 animated-underline">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <a href="mailto:contact@telesante.fr" className="text-gray-600 hover:text-blue-600 animated-underline">
                  contact@telesante.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            © {currentYear} TéléSanté. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-2 text-gray-600">
            <span>Fait avec</span>
            <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse-subtle" />
            <span>pour votre santé</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
