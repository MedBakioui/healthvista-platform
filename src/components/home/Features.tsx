
import { 
  Calendar, Clock, CreditCard, FileText, MessageSquare, Shield, 
  Video, Wallet, Clipboard, Activity
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Video,
      title: 'Consultation vidéo',
      description: 'Consultez en face à face avec un médecin par vidéoconférence sécurisée.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: MessageSquare,
      title: 'Chat médical',
      description: 'Posez vos questions et recevez des conseils via notre messagerie instantanée.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Calendar,
      title: 'Rendez-vous rapides',
      description: 'Obtenez un rendez-vous en moins de 10 minutes, 7j/7 et 24h/24.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: FileText,
      title: 'Ordonnances',
      description: 'Recevez votre ordonnance électronique directement après la consultation.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Shield,
      title: 'Sécurité des données',
      description: 'Vos données médicales sont chiffrées et protégées selon les normes en vigueur.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Wallet,
      title: 'Remboursement',
      description: 'Consultations prises en charge par l\'Assurance Maladie et les complémentaires.',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      icon: Clock,
      title: 'Historique médical',
      description: 'Accédez à tout moment à l\'historique de vos consultations et prescriptions.',
      color: 'bg-teal-100 text-teal-600'
    },
    {
      icon: CreditCard,
      title: 'Paiement sécurisé',
      description: 'Payez en toute sécurité par carte bancaire ou via votre espace patient.',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Clipboard,
      title: 'Suivi personnalisé',
      description: 'Bénéficiez d\'un suivi médical adapté à vos besoins et à votre parcours.',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: Activity,
      title: 'Multispécialités',
      description: 'Accédez à plus de 20 spécialités médicales différentes.',
      color: 'bg-cyan-100 text-cyan-600'
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10"></div>
      
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-heading">Une solution complète pour votre santé</h2>
          <p className="section-subheading">
            Notre plateforme offre tous les outils nécessaires pour prendre soin de votre santé à distance, 
            avec la même qualité qu'une consultation en cabinet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 flex flex-col items-center text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
