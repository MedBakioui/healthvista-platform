
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Clock, Calendar as CalendarIcon, Phone, Mail, ArrowLeft, Check } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Mock fetch function
const fetchDoctor = async (id: string) => {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return {
    id,
    name: 'Dr. Marie Dubois',
    specialty: 'Médecin généraliste',
    rating: 4.8,
    reviewCount: 127,
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    address: '15 rue de la Santé, 75013 Paris',
    availability: '9h00 - 18h00, Lun-Ven',
    price: '25 €',
    bio: "Le Dr. Marie Dubois est médecin généraliste depuis plus de 15 ans. Diplômée de la faculté de médecine de Paris, elle a exercé en milieu hospitalier avant d'ouvrir son cabinet. Elle est particulièrement attentive à la relation médecin-patient et prend le temps d'écouter et d'expliquer les diagnostics et traitements.",
    education: [
      { degree: 'Doctorat en Médecine', institution: 'Université Paris Descartes', year: '2005' },
      { degree: 'Spécialisation en Médecine Générale', institution: 'Hôpital Necker-Enfants Malades', year: '2008' }
    ],
    languages: ['Français', 'Anglais', 'Espagnol'],
    specialties: ['Médecine préventive', 'Suivi des maladies chroniques', 'Pédiatrie', 'Gériatrie']
  };
};

export default function DoctorDetail() {
  const { id } = useParams<{ id: string }>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const { data: doctor, isLoading, error } = useQuery({
    queryKey: ['doctor', id],
    queryFn: () => fetchDoctor(id || ''),
  });

  const timeSlots = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  if (isLoading) return <div className="container-custom py-16 flex justify-center">Chargement...</div>;
  if (error) return <div className="container-custom py-16">Une erreur est survenue</div>;
  if (!doctor) return <div className="container-custom py-16">Médecin non trouvé</div>;

  return (
    <div className="container-custom py-12 space-y-8">
      <Link to="/doctors" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux médecins
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="h-24 w-24 border-2 border-blue-100">
                  <img src={doctor.image} alt={doctor.name} />
                </Avatar>
                
                <div className="space-y-3">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
                    <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-500 mr-2">
                      <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      <span className="ml-1 font-medium">{doctor.rating}</span>
                    </div>
                    <span className="text-gray-500">({doctor.reviewCount} avis)</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{doctor.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{doctor.availability}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="about">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="about">À propos</TabsTrigger>
              <TabsTrigger value="experience">Expérience</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Présentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{doctor.bio}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Spécialités</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Langues parlées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((language, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <Check className="h-4 w-4 text-green-500 mr-1" />
                        {language}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Formation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {doctor.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4 py-1">
                        <p className="font-semibold text-gray-900">{edu.degree}</p>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-gray-500 text-sm">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Avis des patients</CardTitle>
                  <CardDescription>Fonctionnalité à venir</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6">
                    <p className="text-gray-500">Les avis des patients seront bientôt disponibles.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Prendre rendez-vous</CardTitle>
              <CardDescription>Consultation: {doctor.price}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="mb-2 font-medium text-gray-700">Sélectionnez une date</p>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border rounded-md"
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                />
              </div>
              
              {date && (
                <div>
                  <p className="mb-2 font-medium text-gray-700">Horaires disponibles {date ? format(date, 'dd MMMM yyyy', { locale: fr }) : ''}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTimeSlot === time ? "default" : "outline"}
                        className={selectedTimeSlot === time ? "bg-blue-500 hover:bg-blue-600" : ""}
                        onClick={() => setSelectedTimeSlot(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600"
                disabled={!selectedTimeSlot}
              >
                Confirmer le rendez-vous
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
