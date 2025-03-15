
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserPlus, Calendar, Video, FileText } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: "Créez votre compte",
    description: "Inscrivez-vous en quelques clics et complétez votre profil médical de manière sécurisée.",
    color: "bg-blue-500"
  },
  {
    icon: Calendar,
    title: "Prenez rendez-vous",
    description: "Choisissez un médecin disponible et sélectionnez un créneau horaire qui vous convient.",
    color: "bg-green-500"
  },
  {
    icon: Video,
    title: "Consultez en ligne",
    description: "Connectez-vous à l'heure du rendez-vous pour votre consultation vidéo avec le médecin.",
    color: "bg-purple-500"
  },
  {
    icon: FileText,
    title: "Recevez votre ordonnance",
    description: "Si nécessaire, recevez votre ordonnance électronique directement après la consultation.",
    color: "bg-orange-500"
  }
];

export default function HowItWorks() {
  const MotionArrow = motion.div;

  return (
    <section className="py-20 relative bg-gray-50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-heading">Comment ça marche</h2>
          <p className="section-subheading">
            Notre service de téléconsultation est simple et rapide. Suivez ces quelques étapes pour consulter un médecin en ligne.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <div 
                  className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white z-10 shadow-lg mb-6`}
                >
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <MotionArrow 
                    className="absolute top-8 -right-5 hidden lg:block"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                  >
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </MotionArrow>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link to="/register">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Prendre rendez-vous maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
