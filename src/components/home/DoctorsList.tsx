
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Star, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample doctor data
const doctors = [
  {
    id: 1,
    name: 'Dr. Sophie Martin',
    specialty: 'Médecine générale',
    rating: 4.9,
    reviews: 124,
    availability: 'Disponible aujourd\'hui',
    experience: '12 ans',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 2,
    name: 'Dr. Thomas Dubois',
    specialty: 'Pédiatrie',
    rating: 4.8,
    reviews: 98,
    availability: 'Disponible demain',
    experience: '8 ans',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 3,
    name: 'Dr. Émilie Bernard',
    specialty: 'Dermatologie',
    rating: 4.7,
    reviews: 87,
    availability: 'Disponible aujourd\'hui',
    experience: '10 ans',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    id: 4,
    name: 'Dr. Pierre Lambert',
    specialty: 'Cardiologie',
    rating: 4.9,
    reviews: 156,
    availability: 'Disponible dans 2 jours',
    experience: '15 ans',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  }
];

export default function DoctorsList() {
  const [currentDoctor, setCurrentDoctor] = useState(0);

  const nextDoctor = () => {
    setCurrentDoctor((prev) => (prev + 1) % doctors.length);
  };

  const prevDoctor = () => {
    setCurrentDoctor((prev) => (prev - 1 + doctors.length) % doctors.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-heading">Nos médecins certifiés</h2>
          <p className="section-subheading">
            Consultez nos médecins expérimentés et certifiés, disponibles pour répondre à vos besoins médicaux à tout moment.
          </p>
        </div>

        {/* Mobile View (Carousel) */}
        <div className="block md:hidden relative">
          <div className="glass-card p-6 relative">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <img 
                  src={doctors[currentDoctor].image} 
                  alt={doctors[currentDoctor].name} 
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  {doctors[currentDoctor].availability}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctors[currentDoctor].name}</h3>
              <p className="text-blue-600 mb-2">{doctors[currentDoctor].specialty}</p>
              
              <div className="flex items-center space-x-1 mb-3">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-gray-700 font-medium">{doctors[currentDoctor].rating}</span>
                <span className="text-gray-500">({doctors[currentDoctor].reviews} avis)</span>
              </div>
              
              <p className="text-gray-600 mb-4">Expérience: {doctors[currentDoctor].experience}</p>
              
              <Link to="/appointments">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Prendre rendez-vous</span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="absolute top-1/2 -left-3 transform -translate-y-1/2">
            <button 
              onClick={prevDoctor}
              className="bg-white rounded-full p-2 shadow-md"
              aria-label="Docteur précédent"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
            <button 
              onClick={nextDoctor}
              className="bg-white rounded-full p-2 shadow-md"
              aria-label="Docteur suivant"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {doctors.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentDoctor ? 'bg-blue-500 w-4' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentDoctor(idx)}
                aria-label={`Voir docteur ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View (Grid) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div 
              key={doctor.id} 
              className="glass-card p-6 hover:shadow-glass-hover transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {doctor.availability}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-blue-600 mb-2">{doctor.specialty}</p>
                
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-gray-700 font-medium">{doctor.rating}</span>
                  <span className="text-gray-500">({doctor.reviews} avis)</span>
                </div>
                
                <p className="text-gray-600 mb-4">Expérience: {doctor.experience}</p>
                
                <Link to="/appointments">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Prendre rendez-vous</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/doctors" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-all">
            <span>Voir tous nos médecins</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
