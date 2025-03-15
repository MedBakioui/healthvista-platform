
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calendar, Search, Filter, Star, MapPin, 
  Clock, ArrowUpDown, ChevronDown
} from 'lucide-react';

// Sample doctor data (expanded from DoctorsList component)
const allDoctors = [
  {
    id: 1,
    name: 'Dr. Sophie Martin',
    specialty: 'Médecine générale',
    rating: 4.9,
    reviews: 124,
    availability: 'Disponible aujourd\'hui',
    experience: '12 ans',
    location: 'Paris, 75008',
    languages: ['Français', 'Anglais'],
    nextSlot: '14:30',
    price: '25€',
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
    location: 'Lyon, 69002',
    languages: ['Français', 'Espagnol'],
    nextSlot: '09:15',
    price: '35€',
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
    location: 'Marseille, 13008',
    languages: ['Français', 'Italien'],
    nextSlot: '11:45',
    price: '50€',
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
    location: 'Bordeaux, 33000',
    languages: ['Français', 'Allemand'],
    nextSlot: '16:00',
    price: '60€',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 5,
    name: 'Dr. Marine Rousseau',
    specialty: 'Psychiatrie',
    rating: 4.8,
    reviews: 112,
    availability: 'Disponible aujourd\'hui',
    experience: '9 ans',
    location: 'Lille, 59000',
    languages: ['Français', 'Anglais'],
    nextSlot: '13:00',
    price: '55€',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 6,
    name: 'Dr. Nicolas Mercier',
    specialty: 'Endocrinologie',
    rating: 4.6,
    reviews: 78,
    availability: 'Disponible demain',
    experience: '7 ans',
    location: 'Toulouse, 31000',
    languages: ['Français'],
    nextSlot: '10:30',
    price: '45€',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  }
];

const specialties = [
  'Toutes spécialités',
  'Médecine générale',
  'Pédiatrie',
  'Dermatologie',
  'Cardiologie',
  'Psychiatrie',
  'Endocrinologie'
];

const Doctors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Toutes spécialités');
  const [sortOption, setSortOption] = useState('recommended');

  // Filter doctors based on search and specialty
  const filteredDoctors = allDoctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === 'Toutes spécialités' || 
                             doctor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  // Sort doctors based on selected option
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch(sortOption) {
      case 'rating':
        return b.rating - a.rating;
      case 'availability':
        return a.availability.includes('aujourd\'hui') ? -1 : 1;
      case 'price-low':
        return parseInt(a.price) - parseInt(b.price);
      case 'price-high':
        return parseInt(b.price) - parseInt(a.price);
      default: // recommended - sort by a combination of factors
        return (b.rating * 10 + (b.reviews / 10)) - (a.rating * 10 + (a.reviews / 10));
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 bg-gray-50">
        <div className="container-custom">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Nos médecins</h1>
            <p className="text-lg text-gray-600">
              Trouvez le spécialiste qui vous convient parmi notre réseau de médecins certifiés.
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Label htmlFor="search-doctors" className="mb-2 block">Recherche</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input 
                    id="search-doctors"
                    type="text" 
                    placeholder="Nom, spécialité ou ville" 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="specialty" className="mb-2 block">Spécialité</Label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select 
                    id="specialty"
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-8 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="sort" className="mb-2 block">Trier par</Label>
                <div className="relative">
                  <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select 
                    id="sort"
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-8 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="recommended">Recommandés</option>
                    <option value="rating">Mieux notés</option>
                    <option value="availability">Disponibilité</option>
                    <option value="price-low">Prix (croissant)</option>
                    <option value="price-high">Prix (décroissant)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {sortedDoctors.length} médecins trouvés
            </p>
          </div>
          
          {/* Doctors list */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-full">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                          <p className="text-blue-600">{doctor.specialty}</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-gray-700 font-medium ml-1">{doctor.rating}</span>
                          <span className="text-gray-500 ml-1">({doctor.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{doctor.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>Prochaine disponibilité: aujourd'hui à {doctor.nextSlot}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="font-medium">Langues:</span>
                          <span className="ml-2">{doctor.languages.join(', ')}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="font-medium">Tarif:</span>
                          <span className="ml-2">{doctor.price} (remboursé)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <Link to={`/doctors/${doctor.id}`} className="text-blue-600 font-medium hover:underline">
                        Voir le profil
                      </Link>
                      <Link to={`/appointments/new?doctor=${doctor.id}`}>
                        <Button className="bg-blue-500 hover:bg-blue-600 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Prendre rendez-vous
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Doctors;
