
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Calendar, MapPin, Clock, Star, 
  Languages, GraduationCap, Award, Phone,
  Mail, MessageCircle, Video, FileText
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Sample doctor data (expanded from Doctors page)
const allDoctors = [
  {
    id: "1",
    name: 'Dr. Sophie Martin',
    specialty: 'Médecine générale',
    rating: 4.9,
    reviews: 124,
    availability: 'Disponible aujourd\'hui',
    experience: '12 ans',
    location: 'Paris, 75008',
    address: '47 Boulevard Haussmann, 75008 Paris',
    languages: ['Français', 'Anglais'],
    nextSlot: '14:30',
    price: '25€',
    education: 'Université de Paris - Faculté de Médecine',
    certifications: ['Diplôme d\'État de docteur en médecine', 'Spécialisation en médecine générale'],
    about: "Médecin généraliste avec plus de 12 ans d'expérience, je propose une approche centrée sur le patient. Spécialisée dans la prise en charge des maladies chroniques et la médecine préventive, je m'engage à offrir des soins personnalisés et à établir une relation de confiance avec mes patients.",
    services: [
      "Consultation médicale générale",
      "Suivi des maladies chroniques",
      "Vaccination",
      "Bilan de santé préventif",
      "Certificats médicaux"
    ],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: "2",
    name: 'Dr. Thomas Dubois',
    specialty: 'Pédiatrie',
    rating: 4.8,
    reviews: 98,
    availability: 'Disponible demain',
    experience: '8 ans',
    location: 'Lyon, 69002',
    address: '15 Rue de la République, 69002 Lyon',
    languages: ['Français', 'Espagnol'],
    nextSlot: '09:15',
    price: '35€',
    education: 'Université Claude Bernard Lyon 1',
    certifications: ['Diplôme d\'État de docteur en médecine', 'Spécialisation en pédiatrie'],
    about: "Pédiatre passionné par le bien-être des enfants, j'assure le suivi de la croissance et du développement de l'enfant de la naissance à l'adolescence. Mon approche bienveillante et pédagogique vise à mettre à l'aise les enfants et à accompagner les parents dans leur rôle.",
    services: [
      "Suivi de la croissance et du développement",
      "Vaccination",
      "Dépistage des troubles du développement",
      "Prise en charge des maladies infantiles",
      "Conseils aux parents"
    ],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: "3",
    name: 'Dr. Émilie Bernard',
    specialty: 'Dermatologie',
    rating: 4.7,
    reviews: 87,
    availability: 'Disponible aujourd\'hui',
    experience: '10 ans',
    location: 'Marseille, 13008',
    address: '174 Avenue du Prado, 13008 Marseille',
    languages: ['Français', 'Italien'],
    nextSlot: '11:45',
    price: '50€',
    education: 'Université d\'Aix-Marseille',
    certifications: ['Diplôme d\'État de docteur en médecine', 'Spécialisation en dermatologie'],
    about: "Dermatologue expérimentée, je traite tous les problèmes liés à la peau, aux cheveux et aux ongles. Je propose des consultations aussi bien pour les affections dermatologiques courantes que pour le dépistage des cancers cutanés et la dermatologie esthétique.",
    services: [
      "Diagnostic et traitement des maladies de peau",
      "Dépistage des cancers cutanés",
      "Traitement de l'acné",
      "Conseils en dermatologie esthétique",
      "Traitement des maladies des ongles et des cheveux"
    ],
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  }
];

// Reviews data
const reviewsData = [
  {
    id: 1,
    doctorId: "1",
    patientName: "Marie Dupont",
    rating: 5,
    date: "2023-06-15",
    comment: "Excellent médecin, très à l'écoute et compétent. A pris le temps de bien m'expliquer mon traitement."
  },
  {
    id: 2,
    doctorId: "1",
    patientName: "Jean Martin",
    rating: 4,
    date: "2023-05-22",
    comment: "Consultation efficace et professionnelle. Seul bémol : un peu d'attente avant le rendez-vous."
  },
  {
    id: 3,
    doctorId: "1",
    patientName: "Sophie Lefebvre",
    rating: 5,
    date: "2023-04-10",
    comment: "Dr. Martin est vraiment attentionnée et explique tout très clairement. Je la recommande vivement !"
  },
  {
    id: 4,
    doctorId: "2",
    patientName: "Laurent Petit",
    rating: 5,
    date: "2023-06-05",
    comment: "Excellent pédiatre, mon fils l'adore ! Très patient et rassurant."
  },
  {
    id: 5,
    doctorId: "2",
    patientName: "Céline Dubois",
    rating: 4,
    date: "2023-05-12",
    comment: "Très bon suivi pour ma fille, des conseils pertinents et une approche très humaine."
  }
];

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find doctor by id from sample data
    const foundDoctor = allDoctors.find(doc => doc.id === id);
    setDoctor(foundDoctor);
    
    // Get reviews for this doctor
    const doctorReviews = reviewsData.filter(review => review.doctorId === id);
    setReviews(doctorReviews);
  }, [id]);
  
  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-lg text-gray-600">Chargement du profil du médecin...</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  // Render stars
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          {/* Doctor profile header */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="bg-blue-50 p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-lg" 
              />
              
              <div className="flex-grow text-center md:text-left">
                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{doctor.name}</h1>
                  <p className="text-xl text-blue-600 font-medium">{doctor.specialty}</p>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-1" />
                    <span className="text-gray-700">{doctor.location}</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 text-gray-500 mr-1" />
                    <span className="text-gray-700">{doctor.experience} d'expérience</span>
                  </div>
                  <div className="flex items-center">
                    <Languages className="h-5 w-5 text-gray-500 mr-1" />
                    <span className="text-gray-700">{doctor.languages.join(', ')}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start mb-6">
                  <div className="flex items-center mr-3">
                    {renderStars(doctor.rating)}
                  </div>
                  <span className="text-gray-700 font-medium">{doctor.rating}</span>
                  <span className="text-gray-500 ml-1">({doctor.reviews} avis)</span>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Link to={`/appointments/new?doctor=${doctor.id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Prendre rendez-vous
                    </Button>
                  </Link>
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Contacter
                  </Button>
                </div>
              </div>
              
              <div className="hidden md:block text-center p-4 bg-white rounded-lg shadow-sm">
                <p className="text-gray-800 font-medium mb-1">Tarif consultation</p>
                <p className="text-2xl font-bold text-blue-600 mb-1">{doctor.price}</p>
                <p className="text-sm text-gray-500">Remboursé par la sécurité sociale</p>
              </div>
            </div>

            {/* Quick info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
              <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Prochaine disponibilité</p>
                  <p className="font-medium text-gray-900">Aujourd'hui à {doctor.nextSlot}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Consultations réalisées</p>
                  <p className="font-medium text-gray-900">+ de 5000</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Temps de réponse</p>
                  <p className="font-medium text-gray-900">Moins de 3 heures</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content with tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="mb-6 grid grid-cols-3 h-auto">
                  <TabsTrigger value="about" className="py-3">À propos</TabsTrigger>
                  <TabsTrigger value="services" className="py-3">Services</TabsTrigger>
                  <TabsTrigger value="reviews" className="py-3">Avis ({reviews.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Présentation</h2>
                      <p className="text-gray-700 mb-6 leading-relaxed">{doctor.about}</p>
                      
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Formation</h3>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <GraduationCap className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{doctor.education}</span>
                        </li>
                      </ul>
                      
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Certifications</h3>
                      <ul className="space-y-2">
                        {doctor.certifications.map((cert, index) => (
                          <li key={index} className="flex items-start">
                            <Award className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="services">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Services médicaux</h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {doctor.services.map((service, index) => (
                          <li key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{service}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Types de consultation</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start">
                          <Video className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">Vidéo consultation</h3>
                            <p className="text-gray-600 text-sm">Consultation en ligne via notre plateforme sécurisée</p>
                          </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start">
                          <MessageCircle className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">Chat médical</h3>
                            <p className="text-gray-600 text-sm">Échange par messages pour les questions simples</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Avis des patients</h2>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {renderStars(doctor.rating)}
                          </div>
                          <span className="font-bold text-gray-900">{doctor.rating}</span>
                          <span className="text-gray-500 ml-1">({doctor.reviews})</span>
                        </div>
                      </div>
                      
                      {reviews.length > 0 ? (
                        <div className="space-y-6">
                          {reviews.map((review) => (
                            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center">
                                  <Avatar className="h-10 w-10 mr-3">
                                    <AvatarFallback>{review.patientName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-gray-900">{review.patientName}</p>
                                    <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                                  </div>
                                </div>
                                <div className="flex">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                              <p className="text-gray-700 mt-2">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-center py-8">Aucun avis pour le moment.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Adresse du cabinet</h2>
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{doctor.address}</p>
                </div>
                <div className="bg-gray-200 h-48 rounded-lg mb-4">
                  {/* This would be a map component in a real app */}
                  <div className="h-full flex items-center justify-center text-gray-500">
                    Carte du cabinet
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Voir l'itinéraire
                </Button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-500 mr-3" />
                    <span className="text-gray-700">01 23 45 67 89</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-500 mr-3" />
                    <span className="text-gray-700">contact@telesante.fr</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-gray-700 mb-4">Vous avez une question ?</p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Contacter le médecin
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorDetail;
