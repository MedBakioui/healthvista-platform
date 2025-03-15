
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Calendar as CalendarIcon } from 'lucide-react';
import AppointmentForm from '@/components/appointments/AppointmentForm';

// Sample appointment data
const appointmentsData = [
  {
    id: 1,
    doctorName: 'Dr. Sophie Martin',
    doctorSpecialty: 'Médecine générale',
    doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: '2023-08-15',
    time: '14:30',
    status: 'upcoming',
    type: 'Vidéo',
  },
  {
    id: 2,
    doctorName: 'Dr. Thomas Dubois',
    doctorSpecialty: 'Pédiatrie',
    doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: '2023-07-25',
    time: '09:15',
    status: 'completed',
    type: 'Chat',
  },
  {
    id: 3,
    doctorName: 'Dr. Émilie Bernard',
    doctorSpecialty: 'Dermatologie',
    doctorImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    date: '2023-07-10',
    time: '11:45',
    status: 'completed',
    type: 'Vidéo',
  }
];

const Appointments = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const isNewAppointment = searchParams.get('new') === 'true' || searchParams.get('doctor');
  const doctorId = searchParams.get('doctor');
  
  const [selectedTab, setSelectedTab] = useState(isNewAppointment ? 'new' : 'upcoming');

  const upcomingAppointments = appointmentsData.filter(appointment => appointment.status === 'upcoming');
  const pastAppointments = appointmentsData.filter(appointment => appointment.status === 'completed');

  // Format date from YYYY-MM-DD to a more readable format
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Vos rendez-vous</h1>
            <p className="text-lg text-gray-600">
              Gérez vos consultations médicales passées et à venir.
            </p>
          </div>
          
          <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="upcoming" className="flex-1">
                À venir <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">{upcomingAppointments.length}</span>
              </TabsTrigger>
              <TabsTrigger value="past" className="flex-1">
                Passés <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{pastAppointments.length}</span>
              </TabsTrigger>
              <TabsTrigger value="new" className="flex-1">
                Nouveau rendez-vous
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-6">
                  {upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 md:w-3/4 flex flex-col md:flex-row gap-6">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={appointment.doctorImage} 
                              alt={appointment.doctorName} 
                              className="w-16 h-16 rounded-full object-cover" 
                            />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
                              <p className="text-blue-600">{appointment.doctorSpecialty}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start md:items-center space-x-6">
                            <div className="flex items-center text-gray-700">
                              <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                              <span>{formatDate(appointment.date)}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <Clock className="h-5 w-5 mr-2 text-blue-500" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
                              {appointment.type}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-6 md:w-1/4 flex flex-row md:flex-col justify-between items-center md:items-stretch space-y-0 md:space-y-4">
                          <Button className="bg-blue-500 hover:bg-blue-600 w-auto md:w-full">
                            Rejoindre
                          </Button>
                          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 w-auto md:w-full">
                            Annuler
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pas de rendez-vous à venir</h3>
                  <p className="text-gray-600 mb-6">Vous n'avez aucun rendez-vous planifié.</p>
                  <Button 
                    onClick={() => setSelectedTab('new')}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Prendre un rendez-vous
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {pastAppointments.length > 0 ? (
                <div className="space-y-6">
                  {pastAppointments.map(appointment => (
                    <div key={appointment.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 md:w-3/4 flex flex-col md:flex-row gap-6">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={appointment.doctorImage} 
                              alt={appointment.doctorName} 
                              className="w-16 h-16 rounded-full object-cover filter grayscale" 
                            />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
                              <p className="text-blue-600">{appointment.doctorSpecialty}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start md:items-center space-x-6">
                            <div className="flex items-center text-gray-700">
                              <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                              <span>{formatDate(appointment.date)}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <Clock className="h-5 w-5 mr-2 text-gray-400" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                              {appointment.type}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-6 md:w-1/4 flex flex-row md:flex-col justify-between items-center md:items-stretch space-y-0 md:space-y-4">
                          <Button variant="outline" className="w-auto md:w-full">
                            Voir le résumé
                          </Button>
                          <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 w-auto md:w-full">
                            Reprendre rendez-vous
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun rendez-vous passé</h3>
                  <p className="text-gray-600">Votre historique de consultations sera affiché ici.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="new">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Prendre un rendez-vous</h2>
                <AppointmentForm preselectedDoctorId={doctorId} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Appointments;
